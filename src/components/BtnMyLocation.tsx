import { useRef } from "react";
import { useStore } from "@nanostores/react";
import { $places } from "@/store/places.store";
import { $map } from "@/store/map.store";

export const BtnMyLocation = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { userLocation } = useStore($places);
  const { isMapReady, map } = useStore($map);

  const onClick = () => {
    if (isMapReady && map) {
      map.flyTo({
        center: [userLocation!.longitude, userLocation!.latitude],
        essential: true,
        zoom: 14,
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="bg-neutral-800 hover:bg-transparent border border-neutral-800 hover:text-neutral-900 cursor-pointer text-white font-bold py-2 px-4 rounded shadow-lg transition animate-fade"
    >
      Mi Ubicación
    </button>
  );
};
