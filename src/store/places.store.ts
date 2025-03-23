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

// Todo: remover los setTimeout y reemplazarlos por procesos asíncronos reales

export const placesReducer = {
  setUserLocation: (location: Location) => {
    $places.set({
      ...$places.get(),
      isLoading: true,
    });

    setTimeout(() => {
      // Simulate async process
      $places.set({
        ...$places.get(),
        userLocation: location,
        isLoading: false,
      });

      saveState($places.get());
    }, 1000); // Replace with actual async process
  },
  setInitialState: () => {
    $places.set({
      ...INITIAL_STATE,
      isLoading: true,
    });

    setTimeout(() => {
      // Simulate async process
      $places.set({
        ...INITIAL_STATE,
        isLoading: false,
      });

      saveState($places.get());
    }, 1000); // Replace with actual async process
  },
};
