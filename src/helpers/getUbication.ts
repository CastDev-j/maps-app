import { placesReducer } from "@/store/places.store";

/**
 * Ejecuta la geolocalización del navegador. el metodo retorna la ubicación del usuario
 * o puedes acceder a ella desde el estado global de la aplicación.
 *
 * @remarks
 * Este método guarda en el estado global de la aplicación la ubicación del usuario.
 *
 * @example
 * getUbication();
 *
 * @throws Si el navegador no soporta la geolocalización, se muestra un mensaje en la consola.
 */
export const getUbication = async (): Promise<{ latitude: number; longitude: number }> => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return { latitude: 0, longitude: 0 };
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        placesReducer.setUserLocation(location);
        resolve(location);
      },
      (error) => {
        console.error("Error obtaining geolocation:", error);
        reject(error);
      }
    );
  });
};
