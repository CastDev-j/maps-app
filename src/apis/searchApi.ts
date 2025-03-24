import { mapBoxToken } from "@/sharedEnv";
import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/search/searchbox/v1",
  params: {
    limit: 5,
    language: "es",
    access_token: mapBoxToken,
    session_token: "12b1d6ca86-6558-41f5-a35b-69f2475d140934567890",
  },
});

const latLongApi = axios.create({
  baseURL: "https://api.mapbox.com/search/searchbox/v1/retrieve",
  params: {
    access_token: mapBoxToken,
    session_token: "12b1d6ca86-6558-41f5-a35b-69f2475d140934567890",
  },
});

export { searchApi, latLongApi };
