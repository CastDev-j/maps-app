import type { Location } from "@/interfaces";

export const validateUserLocation = (location?: Location) => {
  const { latitude = 0, longitude = 0 } = location || {};
  if (latitude === 0 && longitude === 0) {
    return false;
  }

  return true;
};
