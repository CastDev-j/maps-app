import { useStore } from "@nanostores/react";
import { $places, placesReducer } from "@/store/places.store";
import { getUbication } from "@/helpers/getUbication";

export const MapsApp = () => {
  const { isLoading, userLocation } = useStore($places);

  return (
    <section className="w-full flex flex-col items-start gap-6">
      <h1>MapsApp</h1>

      <p>Aquí va el mapa</p>

      <button
        className={`px-4 py-2 rounded-md text-white ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => {
          if (!isLoading) getUbication();
        }}
        disabled={isLoading}
      >
        Colocar Ubicación
      </button>

      <button
        className={`px-4 py-2 rounded-md text-white ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
        }`}
        onClick={() => {
          if (!isLoading) placesReducer.setInitialState();
        }}
        disabled={isLoading}
      >
        Resetear
      </button>

      <code>
        <pre>
          Estado de la aplicación:
          <br />
          {JSON.stringify({ isLoading, userLocation }, null, 2)}
        </pre>
      </code>
    </section>
  );
};
