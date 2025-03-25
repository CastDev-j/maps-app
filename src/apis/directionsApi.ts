import { mapBoxToken } from "@/sharedEnv";
import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    access_token: mapBoxToken,
    language: "es",
    overview: "simplified",
    steps: false,
  },
});

export { directionsApi };
