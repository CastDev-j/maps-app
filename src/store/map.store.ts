import mapboxgl, { Map, Marker, Popup } from "mapbox-gl";
import { atom } from "nanostores";
mapboxgl.accessToken = import.meta.env.PUBLIC_MAPBOX_TOKEN || "";

interface MapProps {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapProps = {
  isMapReady: false,
  map: undefined,
};

export const $map = atom<MapProps>(INITIAL_STATE);

const extraConfigMap = (map: Map) => {
  const myLocationPopup = new Popup().setHTML(
    `
    <h1 class="text-lg font-bold text-neutral-900">Mi Ubicación</h1>
    <p class="text-neutral-700">Latitud: ${map.getCenter().lat}</p>
    <p class="text-neutral-700">Longitud: ${map.getCenter().lng}</p>
    `
  );

  new Marker({
    color: "#262626",
  })
    .setLngLat(map.getCenter())
    .setPopup(myLocationPopup)
    .addTo(map);

  return map;
};

export const mapReducer = {
  setMapReady: (map: Map) => {
    $map.set({
      ...$map.get(),
      isMapReady: true,
      map: extraConfigMap(map),
    });
  },
  setMapNotReady: () => {
    $map.set({
      ...$map.get(),
      isMapReady: false,
      map: undefined,
    });
  },
  setInitialState: () => {
    $map.set({
      ...INITIAL_STATE,
    });
  },
};
