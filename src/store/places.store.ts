import { latLongApi, searchApi } from "@/apis/searchApi";
import { getUbication } from "@/helpers/getUbication";
import type { Location, PlacesState, Suggestion } from "@/interfaces";
import { atom } from "nanostores";
import { $map, mapReducer } from "./map.store";
import { generateMarkers } from "@/helpers/generateMarkers";

const saveState = (state: PlacesState) => {
  localStorage.setItem("places", JSON.stringify(state));
};

const loadState = () => {
  const state = localStorage.getItem("places");
  if (state) {
    return JSON.parse(state);
  }
  return INITIAL_STATE;
};

const INITIAL_STATE: PlacesState = {
  isLoading: false,
  isSuggestionsLoading: false,
  query: "",
  userLocation: {
    latitude: 0,
    longitude: 0,
  },
  suggestions: [],
};

export const $places = atom<PlacesState>(loadState());

export const placesReducer = {
  setUserLocation: (location: Location) => {
    $places.set({
      ...$places.get(),
      isLoading: true,
    });

    $places.set({
      ...$places.get(),
      userLocation: location,
      isLoading: false,
    });

    saveState($places.get());
  },
  setInitialState: () => {
    $places.set({
      ...INITIAL_STATE,
      isLoading: true,
    });

    $places.set({
      ...INITIAL_STATE,
      isLoading: false,
    });

    saveState($places.get());
  },
  getUserLocation: async () => {
    $places.set({
      ...$places.get(),
      isLoading: true,
    });

    try {
      const ubication = await getUbication();
      $places.set({
        ...$places.get(),
        userLocation: ubication,
      });
      saveState($places.get());

      return ubication;
    } catch (error) {
      console.error("Error getting user location:", error);
      $places.set({
        ...$places.get(),
        isLoading: false,
      });

      return null;
    }
  },
  searchPlaces: async (query: string) => {
    if (query.length === 0) {
      $places.set({
        ...$places.get(),
        suggestions: [],
        query: "",
      });

      saveState($places.get());
      mapReducer.setMarkers(generateMarkers());
      return;
    }
    if (!$places.get().userLocation)
      throw new Error("No hay ubicación del usuario");

    $places.set({
      ...$places.get(),
      query,
      isSuggestionsLoading: true,
    });

    const resp = await searchApi.get(`/suggest`, {
      params: {
        proximity: `${$places.get().userLocation!.longitude},${
          $places.get().userLocation!.latitude
        }`,
        q: query,
      },
    });

    const suggestionsTemp = resp.data.suggestions as Suggestion[];

    const suggestions = await Promise.all(
      suggestionsTemp.map(async (suggestion) => {
        const id = suggestion.mapbox_id;

        const resp = await latLongApi.get(`/${id}`);

        return {
          ...suggestion,
          coordinates: resp.data.features[0].geometry.coordinates,
        };
      })
    );

    $places.set({
      ...$places.get(),
      suggestions,
      isSuggestionsLoading: false,
    });

    saveState($places.get());
    mapReducer.setMarkers(generateMarkers());
  },
};
