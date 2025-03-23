import { useStore } from "@nanostores/react";
import { $places, placesReducer } from "@/store/places.store";
import { MapView } from "./MapView.Map";
import { Loading } from "./Loading";
import { validateUserLocation } from "@/helpers/validUserLocation";
import { useEffect, useState } from "react";
import { MapStart } from "./MapStart";
import { BtnMyLocation } from "./BtnMyLocation";

export const MapsApp = () => {
  const { isLoading, isValidLocation, userLocation } = useMapsApp();

  return (
    <section className="w-full flex flex-col items-start gap-6">
      {isLoading && <Loading />}

      {!isValidLocation && !isLoading && <MapStart />}

      {isValidLocation && !isLoading && (
        <>
          <BtnMyLocation />
          <MapView />
        </>
      )}

      <button
        onClick={() => {
          if (!isLoading) placesReducer.setInitialState();
        }}
        disabled={isLoading}
      >
        Resetear
      </button>
    </section>
  );
};

const useMapsApp = () => {
  const { isLoading, userLocation } = useStore($places);
  const [isValidLocation, setIsValidLocation] = useState(false);

  useEffect(() => {
    const isValid = validateUserLocation(userLocation);
    setIsValidLocation(isValid);
  }, [userLocation]);

  return {
    isLoading,
    userLocation,
    isValidLocation,
  };
};
