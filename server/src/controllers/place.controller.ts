import { logger } from "@/config/logger";
import { getCache, setCache } from "@/utils/cache";
import { ApiResponse, asyncHandler, handleZodError } from "@/utils/core";
import { getPlacesAutoComplete } from "@/utils/google-maps";
import { validateAutocompleteInput } from "@/validations/place.validations";

import { StatusCodes } from "http-status-codes";

type Suggestions = {
  placeId: string;
  displayName: string;
  city: string;
  state: string;
  country: string;
}[];

export const getAutocompleteSuggestions = asyncHandler(async (req, res) => {
  const { input } = handleZodError(validateAutocompleteInput(req.body));

  logger.info("Autocomplete request", { input });

  const cacheKey = `places:autocomplete:${input}`;

  // Check cache first
  const cached = await getCache<Suggestions>(cacheKey);

  if (cached) {
    logger.info("Autocomplete cache hit", { input });
    const response = new ApiResponse(
      StatusCodes.OK,
      "Location suggestions retrieved successfully",
      cached
    );

    return res.status(response.statusCode).json(response);
  }

  logger.info("Autocomplete cache miss", { input });

  let placesResponse = await getPlacesAutoComplete(input);
  const suggestions: Suggestions = placesResponse.data.predictions
    .slice(0, 5)
    .map((prediction) => {
      // Parse location components from description
      // "City, State, Country"
      const parts = prediction.description
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

      const country = parts[parts.length - 1] || "";
      const state =
        parts.length >= 2 ? (parts[parts.length - 2] as string) : "";
      const city = parts.length >= 3 ? (parts[parts.length - 3] as string) : "";

      return {
        placeId: prediction.place_id,
        displayName: prediction.description,
        city,
        state,
        country,
      };
    });

  // Return early if no results
  if (suggestions.length === 0) {
    logger.info("No autocomplete results found", { input });
    const response = new ApiResponse(
      StatusCodes.OK,
      "No locations found matching your search",
      suggestions
    );

    return res.status(response.statusCode).json(response);
  }

  // Store cache
  await setCache(cacheKey, suggestions);
  logger.info("Autocomplete results cached", {
    input,
  });

  const response = new ApiResponse(
    StatusCodes.OK,
    "Location suggestions retrieved successfully",
    suggestions
  );

  res.status(response.statusCode).json(response);
});
