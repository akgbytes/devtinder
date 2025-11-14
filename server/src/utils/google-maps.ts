import { env } from "@/config/env";
import { Client } from "@googlemaps/google-maps-services-js";
import { ApiError } from "./core";
import { StatusCodes } from "http-status-codes";
import { logger } from "@/config/logger";

const googleMapsClient = new Client({});

export const getPlacesAutoComplete = async (input: string) => {
  try {
    return await googleMapsClient.placeAutocomplete({
      params: {
        input,
        key: env.GOOGLE_MAPS_API_KEY,
      },
    });
  } catch (error: any) {
    logger.warn("Place autocomplete API error", {
      input,
      error: error.message,
    });

    throw new ApiError(
      StatusCodes.SERVICE_UNAVAILABLE,
      "Location service is temporarily unavailable. Please try again later."
    );
  }
};

export const getGeocodes = async (placeId: string) => {
  try {
    const geoResponse = await googleMapsClient.geocode({
      params: {
        place_id: placeId,
        key: env.GOOGLE_MAPS_API_KEY,
      },
    });

    return geoResponse.data.results[0]?.geometry?.location;
  } catch (error: any) {
    logger.warn("Geocoding API error", {
      placeId,
      error: error.message,
    });
    throw new ApiError(
      StatusCodes.SERVICE_UNAVAILABLE,
      "Location service is temporarily unavailable. Please try again later."
    );
  }
};
