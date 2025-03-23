import { $places, placesReducer } from "@/store/places.store";
import { useStore } from "@nanostores/react";

export const MapStart = () => {
    const { isLoading, userLocation } = useStore($places);

    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold text-neutral-900">MapsApp</h1>
            <p className="text-neutral-700">Aquí va el mapa</p>
            <div className="space-y-2">
                <button
                    className={`px-4 py-2 rounded-md text-neutral-50 ${
                        isLoading
                            ? "bg-neutral-400 cursor-not-allowed"
                            : "bg-neutral-800 hover:bg-neutral-900"
                    }`}
                    onClick={() => {
                        if (!isLoading) placesReducer.getUserLocation();
                    }}
                    disabled={isLoading}
                >
                    Actualizar Ubicación
                </button>
                <button
                    className={`px-4 py-2 rounded-md text-neutral-50 ${
                        isLoading
                            ? "bg-neutral-400 cursor-not-allowed"
                            : "bg-neutral-600 hover:bg-neutral-700"
                    }`}
                    onClick={() => {
                        if (!isLoading) placesReducer.setInitialState();
                    }}
                    disabled={isLoading}
                >
                    Resetear
                </button>
            </div>
            <div className="bg-neutral-100 p-4 rounded-md">
                <code className="text-neutral-800">
                    <pre>
                        Estado de la aplicación:
                        <br />
                        {JSON.stringify({ isLoading, userLocation }, null, 2)}
                    </pre>
                </code>
            </div>
        </div>
    );
};
