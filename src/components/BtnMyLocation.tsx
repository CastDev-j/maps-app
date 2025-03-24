import { useRef } from "react";
import { useStore } from "@nanostores/react";
import { $places } from "@/store/places.store";
import { $map } from "@/store/map.store";
import { FaMap } from "react-icons/fa";

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
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={onClick}
        className="cursor-pointer w-full rounded-md font-semibold border border-neutral-800 bg-neutral-800 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-transparent hover:text-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 flex items-center justify-center gap-2"
      >
        <span>Ubicarme</span>
        <FaMap />
      </button>
    </div>
  );
};
