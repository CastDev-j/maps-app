import { directionsApi } from "@/apis/directionsApi";
import type { Direction } from "@/interfaces";
import { mapBoxToken } from "@/sharedEnv";
import mapboxgl, {
  LngLatBounds,
  Map,
  Marker,
  Popup,
  type AnySourceData,
} from "mapbox-gl";
import { atom } from "nanostores";
mapboxgl.accessToken = mapBoxToken;

interface MapProps {
  isMapReady: boolean;
  map?: Map;
  markers?: Marker[];
}

const INITIAL_STATE: MapProps = {
  isMapReady: false,
  map: undefined,
  markers: [],
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
  setMarkers: (markers: Marker[]) => {
    $map.set({
      ...$map.get(),
      markers,
    });
  },
  getRouteBetween: async (
    origin: [number, number],
    destination: [number, number]
  ) => {
    const response = (await directionsApi.get<Direction>(
      `/${origin.join(",")};${destination.join(",")}`
    )) as { data: Direction };

    const { distance, duration, geometry } = response.data.routes[0];

    const { coordinates: coords } = geometry;

    const km = (distance / 1000).toFixed(2);
    const min = Math.floor(duration / 60);

    console.log({
      km,
      min,
    });

    const bounce = new LngLatBounds(origin, origin);

    for (const coordinate of coords) {
      const newCoords = [coordinate[0], coordinate[1]] as [number, number];
      bounce.extend(newCoords);
    }

    const map = $map.get().map as Map;

    map.fitBounds(bounce, {
      padding: 100,
    });

    const sourceDate: AnySourceData = {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
      },
    };

    if (map.getSource("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    map.addSource("route", sourceDate);
    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#505050",
        "line-width": 3,
      },
    });

    $map.set({
      ...$map.get(),
      map,
    });
  },
};
