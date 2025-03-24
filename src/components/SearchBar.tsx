import type { Suggestion } from "@/interfaces";
import { $places, placesReducer } from "@/store/places.store";
import { useStore } from "@nanostores/react";
import { use, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { useEffect } from "react";
import { $map, mapReducer } from "@/store/map.store";
import { generateMarkers } from "@/helpers/generateMarkers";

const SearchInput = ({
  onQueryChange,
  value,
}: {
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) => (
  <>
    <input
      onChange={onQueryChange}
      type="text"
      placeholder="Buscar lugar..."
      value={value}
      className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
    />
    <FaSearch
      onClick={() => placesReducer.searchPlaces(value)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer hover:text-neutral-600"
      size={16}
    />
  </>
);

const SearchResults = ({ results }: { results: Suggestion[] }) => {
  const [activePlaceId, setactivePlaceId] = useState("");

  const { isSuggestionsLoading, suggestions } = useStore($places);
  const { isMapReady, map } = useStore($map);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(suggestions!.length > 0);

  useEffect(() => {
    if (isSuggestionsLoading) setIsExpanded(true);
  }, [isSuggestionsLoading]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClick = (coordinates: [number, number], id: string) => {
    setactivePlaceId(id);

    if (isMapReady && map) {
      setIsExpanded(false);

      map.flyTo({
        center: coordinates,
        essential: true,
        zoom: 14,
      });
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={toggleExpand}
        className="text-sm text-neutral-500 underline cursor-pointer mb-2 absolute w-full text-center"
      >
        {suggestions!.length > 0 &&
          (isExpanded ? "Contraer resultados" : "Desplegar resultados")}
      </button>
      {isExpanded && (
        <ul className="flex flex-col gap-2 z-10 p-3 py-2 absolute bg-white w-full border border-neutral-300 rounded-md shadow-md mt-1">
          <li className="text-sm text-neutral-900 mb-2 font-semibold flex justify-between items-center">
            Resultados de la búsqueda
            <GrFormClose
              className="cursor-pointer hover:text-neutral-600"
              onClick={toggleExpand}
            />
          </li>
          {results.map((result, index) => (
            <li
              onClick={() =>
                onClick(
                  result.coordinates as [number, number],
                  result.mapbox_id
                )
              }
              key={index}
              className={`group cursor-pointer rounded-md p-2 hover:bg-neutral-100 transition-colors ${
                activePlaceId === result.mapbox_id ? "bg-neutral-100" : ""
              }`}
            >
              <div className="text-sm font-medium text-neutral-800 group-hover:text-neutral-900">
                {result.name}
              </div>
              <div className="text-xs text-neutral-500 group-hover:text-neutral-700">
                {result.address}
              </div>
              <button className="mt-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors">
                Detalles
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const SearchBar = () => {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null!);
  const { suggestions, query } = useStore($places);

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(query || "");
  }, []);

  useEffect(() => {
    mapReducer.setMarkers(generateMarkers());
  }, []);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setValue(e.target.value);

    debounceRef.current = setTimeout(() => {
      console.log(e.target.value);
      placesReducer.searchPlaces(e.target.value);
    }, 1000);
  };

  return (
    <div className="relative max-w-md">
      <SearchInput onQueryChange={onQueryChange} value={value} />
      {suggestions && <SearchResults results={suggestions} />}
    </div>
  );
};
