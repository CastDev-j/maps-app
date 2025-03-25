import { $map, mapReducer } from "@/store/map.store";
import { $places, placesReducer } from "@/store/places.store";
import { useStore } from "@nanostores/react";
import { Map } from "mapbox-gl";
import { useLayoutEffect, useRef } from "react";

export const MapView = () => {
  const { isLoading, userLocation } = useStore($places);

  const mapdiv = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    if (!isLoading && userLocation) {
      const map = new Map({
        container: mapdiv.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [userLocation.longitude, userLocation.latitude] as [
          number,
          number
        ],
        zoom: 14,
      });

      mapReducer.setMapReady(map);
    }
  }, [isLoading]);

  return (
    <>
      <div
        className="w-full min-h-screen flex flex-col items-start gap-6 rounded-lg"
        ref={mapdiv}
      ></div>

      <button
        onClick={() => {
          if (!isLoading) placesReducer.setInitialState();
        }}
        disabled={isLoading}
      >
        Resetear Ubicación
      </button>
    </>
  );
};
