import { $map } from "@/store/map.store";
import { $places } from "@/store/places.store";
import { Marker, Popup, type Map } from "mapbox-gl";

export const generateMarkers = () => {
  const { suggestions } = $places.get();
  const map = $map.get().map as Map;
  const markers: Marker[] = $map.get().markers || [];

  markers?.forEach((marker) => marker.remove());

  if (!suggestions) return [];

  const newMarkers: Marker[] = [];
  for (const place of suggestions) {
    const popup = new Popup().setHTML(
      `
        <h1 class="text-lg font-bold text-neutral-900">${place.name}</h1>
        <p class="text-neutral-700">${place.full_address}</p>
        `
    );

    const marker = new Marker({
      color: "#262626",
    })
      .setLngLat(place.coordinates as mapboxgl.LngLatLike)
      .setPopup(popup)
      .addTo(map);

    newMarkers.push(marker);
  }

  $map.set({
    ...$map.get(),
    markers: newMarkers,
  });

  return newMarkers;
};
