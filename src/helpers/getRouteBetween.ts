import { directionsApi } from "@/apis/directionsApi";
import type { Direction } from "astro:transitions/client";

export const getRouteBetween = async (
  origin: [number, number],
  destination: [number, number]
) => {
  const response = await directionsApi.get<Direction>(
    `/${origin.join(",")};${destination.join(",")}`,
    {}
  );

  console.log(response.data);
};
