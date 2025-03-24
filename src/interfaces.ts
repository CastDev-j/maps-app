// Tipado para el estado de las ubicaciones

export type Location = {
  latitude: number;
  longitude: number;
};

export interface PlacesState {
  isLoading: boolean;
  isSuggestionsLoading: boolean;
  query: string;
  userLocation?: Location;
  suggestions?: Suggestion[];
}
export interface LatLongResponse {
  type: string;
  features: Feature[];
  attribution: string;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  name: string;
  name_preferred: string;
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  place_formatted: string;
  context: Context;
  coordinates: Coordinates;
  bbox: number[];
  language: string;
  maki: string;
  metadata: Metadata;
}

export interface Context {
  country: Country;
  region: Region;
  postcode: Place;
  place: Place;
}

export interface Country {
  id: string;
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}

export interface Place {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
  region_code: string;
  region_code_full: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Metadata {}

export interface SearchData {
  suggestions: Suggestion[];
  attribution: string;
  response_id: string;
}

export interface Suggestion {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: Context;
  language: string;
  maki: string;
  poi_category: string[];
  poi_category_ids: string[];
  external_ids: ExternalIDS;
  metadata: Metadata;
  distance: number;
  name_preferred?: string;
  brand?: string[];
  brand_id?: string[];
  coordinates?: number[];
}

export interface Context {
  country: Country;
  postcode: Place;
  place: Place;
  address?: Address;
  street?: Street;
}

export interface Address {
  name: string;
  address_number: string;
  street_name: string;
}

export interface Country {
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}

export interface Place {
  id: string;
  name: string;
}

export interface Street {
  name: string;
}

export interface ExternalIDS {
  dataplor: string;
}

export interface Metadata {}
