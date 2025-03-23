export const prerender = false;


const saveState = (state: PlacesState) => {
  localStorage.setItem("places", JSON.stringify(state));
}

const loadState = () => {
  const state = localStorage.getItem("places");
  if (state) {
    return JSON.parse(state);
  }
  return INITIAL_STATE;
}

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
      userLocation: location,
    });

    saveState($places.get());
  },
  setInitialState: () => {
    $places.set(INITIAL_STATE);

    saveState($places.get());
  }
};
