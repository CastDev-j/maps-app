import { useStore } from "@nanostores/react";
import { $places, placesReducer } from "@/store/places.store";

export const MapsApp = () => {
  const places = useStore($places);

  return (
    <section className="w-full flex flex-col items-start gap-6">
      <h1>MapsApp</h1>

      <p>Aquí va el mapa</p>

      <button
        className="bg-amber-50"
        onClick={() => {
          placesReducer.setUserLocation({
            latitude: 10,
            longitude: 10,
          });
        }}
      >
        Set User Location
      </button>

      {JSON.stringify({ places }, null, 2)}
    </section>
  );
};
