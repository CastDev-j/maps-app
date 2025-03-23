export const prerender = false;

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

import { getUbication } from "@/helpers/getUbication";
import type { Location, PlacesState } from "@/interfaces";
import { atom } from "nanostores";

const INITIAL_STATE: PlacesState = {
  isLoading: false,
  userLocation: {
    latitude: 0,
    longitude: 0,
  },
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

    const ubication = await getUbication();
    $places.set({
      ...$places.get(),
      userLocation: ubication,
    });
    saveState($places.get());

    return ubication;
  },
};
