// useTourFilters.ts
import { useMemo } from "react";
import { type Tour } from "../utils/api";
import mockData from "../data/mock_data.json";

interface UseTourFiltersParams {
  tours: Tour[];
  maxPrice?: number | null;
  sortOrder?: "asc" | "desc" | null;
  activityId?: number | null;
  duration?: string | null;
}

export const useTourFilters = ({
  tours,
  maxPrice,
  sortOrder,
  activityId,
  duration,
}: UseTourFiltersParams): Tour[] => {
  return useMemo(() => {
    let filtered = [...tours];

    // Filtrar por precio máximo
    if (maxPrice != null) {
      filtered = filtered.filter((tour) => tour.price <= maxPrice);
    }

    // Filtrar por actividad
    if (activityId != null) {
      const destinationIdsWithActivity = mockData.destinations
        .filter((dest) => dest.activityId === activityId)
        .map((dest) => dest.id);

      const tourIdsWithActivity = mockData.tour_destinations
        .filter((td) => destinationIdsWithActivity.includes(td.destinationId))
        .map((td) => td.tourId);

      const uniqueTourIds = Array.from(new Set(tourIdsWithActivity));

      filtered = filtered.filter((tour) => uniqueTourIds.includes(tour.id));
    }

    // Filtrar por duración exacta
    if (duration != null && duration !== "") {
      filtered = filtered.filter((tour) => tour.duration === duration);
    }

    // Ordenar por precio
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [tours, maxPrice, sortOrder, activityId, duration]);
};

