// Tipado para el estado de las ubicaciones

export type Location = {
  latitude: number;
  longitude: number;
};

export interface PlacesState {
  isLoading: boolean;
  userLocation?: Location;
}
