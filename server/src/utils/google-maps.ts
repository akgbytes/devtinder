import { env } from "@/config/env";
import { Client, LatLngLiteral } from "@googlemaps/google-maps-services-js";
import { ApiError } from "./core";
import { StatusCodes } from "http-status-codes";
import { DEFAULT_LAT, DEFAULT_LNG } from "./constants";

const googleMapsClient = new Client({});

export const getPlacesAutoComplete = async (input: string) => {
  try {
    return await googleMapsClient.placeAutocomplete({
      params: {
        input,
        key: env.GOOGLE_MAPS_API_KEY,
      },
    });
  } catch (error) {
    console.log("Error while getting suggestions from maps api: ", error);
    console.log("\n\n");
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to get suggestions"
    );
  }
};

export const getGeocodes = async (id: string) => {
  try {
    const geoResponse = await googleMapsClient.geocode({
      params: {
        place_id: id,
        key: env.GOOGLE_MAPS_API_KEY,
      },
    });

    return geoResponse.data.results[0]?.geometry?.location;
  } catch (error) {
    console.log("Error while getting geocodes from google maps api: ", error);
    console.log("\n\n");
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to get geocodes"
    );
  }
};
