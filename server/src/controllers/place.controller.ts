import { env } from "@/config/env";
import { logger } from "@/config/logger";
import { getCache, setCache } from "@/utils/cache";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  handleZodError,
} from "@/utils/core";
import { validateAutocompleteInput } from "@/validations/place.validations";
import {
  Client,
  PlaceAutocompleteResponse,
} from "@googlemaps/google-maps-services-js";
import { StatusCodes } from "http-status-codes";

const googleMapsClient = new Client({});

type Suggestions = {
  placeId: string;
  displayName: string;
  city: string | null | undefined;
  state: string | null | undefined;
  country: string | null;
}[];

export const getAutocompleteSuggestions = asyncHandler(async (req, res) => {
  const { input } = handleZodError(validateAutocompleteInput(req.body));

  // Check cache first
  const cacheKey = `places:${input}`;
  const cached = await getCache<Suggestions>(cacheKey);

  if (cached) {
    logger.info("Cache hit");
    const response = new ApiResponse(
      StatusCodes.OK,
      "Suggestions fetched successfully",
      cached
    );

    return res.status(response.statusCode).json(response);
  }

  logger.info("Cache miss");

  let placesResponse: PlaceAutocompleteResponse;
  try {
    placesResponse = await googleMapsClient.placeAutocomplete({
      params: {
        input,
        key: env.GOOGLE_MAPS_API_KEY,
      },
    });
  } catch (error) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to get suggestions"
    );
  }

  const suggestions: Suggestions = placesResponse.data.predictions
    .slice(0, 5)
    .map((prediction) => {
      // Extract city/state/country from description
      const parts = prediction.description.split(",").map((p) => p.trim());
      const country = parts[parts.length - 1] || null;
      const state = parts.length >= 2 ? parts[parts.length - 2] : null;
      const city = parts.length >= 3 ? parts[parts.length - 3] : null;

      return {
        placeId: prediction.place_id,
        displayName: prediction.description,
        city,
        state,
        country,
      };
    });

  // store in cache
  await setCache(cacheKey, suggestions);

  const response = new ApiResponse(
    StatusCodes.OK,
    "Suggestions fetched successfully",
    suggestions
  );

  res.status(response.statusCode).json(response);
});
