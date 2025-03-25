import { $places, placesReducer } from "@/store/places.store";
import { useStore } from "@nanostores/react";

export const MapStart = () => {
  const { isLoading, userLocation } = useStore($places);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white p-6 gap-6">
      <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">
        ¡Actualiza tu ubicación!
      </h1>
      <p className="text-base text-neutral-700 mb-6 text-center">
        Para comenzar, necesitamos acceder a tu ubicación. Por favor, actualiza
        tu ubicación para continuar.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          className={`cursor-pointer px-4 py-2 rounded-md text-sm font-semibold border-2 border-neutral-950 transition-colors bg-neutral-900 text-white hover:text-neutral-950 hover:bg-transparent`}
          onClick={() => {
            if (!isLoading) placesReducer.getUserLocation();
          }}
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Actualizar Ubicación"}
        </button>
        <button
          className={`cursor-pointer px-4 py-2 rounded-md text-sm font-semibold border border-neutral-900 transition-colors bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white`}
          onClick={() => {
            if (!isLoading) placesReducer.setInitialState();
          }}
          disabled={isLoading}
        >
          Resetear
        </button>
      </div>
      <div className="bg-neutral-50 p-4 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-medium text-neutral-800 mb-2">
          Estado de la aplicación:
        </h2>
        <pre className="text-sm text-neutral-700 overflow-x-auto">
          {JSON.stringify({ isLoading, userLocation }, null, 2)}
        </pre>
      </div>
    </div>
  );
};
