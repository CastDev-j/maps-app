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
export const getUbication = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      placesReducer.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    });
  } else {
    console.log("Geolocation is not supported by this browser.");

    return {
      latitude: 0,
      longitude: 0,
    };
  }
};
