import { logger } from "@/config/logger";
import { getCache, setCache } from "@/utils/cache";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  handleZodError,
} from "@/utils/core";
import { getPlacesAutoComplete } from "@/utils/google-maps";
import { validateAutocompleteInput } from "@/validations/place.validations";

import { StatusCodes } from "http-status-codes";

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
    logger.info("Places cache hit");
    const response = new ApiResponse(
      StatusCodes.OK,
      "Suggestions fetched successfully",
      cached
    );

    return res.status(response.statusCode).json(response);
  }

  logger.info("Places cache miss");

  let placesResponse = await getPlacesAutoComplete(input);

  const suggestions: Suggestions = placesResponse.data.predictions
    .slice(0, 5)
    .map((prediction) => {
      // Extract city, state, country from description
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

  // Store cache
  await setCache(cacheKey, suggestions);

  const response = new ApiResponse(
    StatusCodes.OK,
    "Suggestions fetched successfully",
    suggestions
  );

  res.status(response.statusCode).json(response);
});
