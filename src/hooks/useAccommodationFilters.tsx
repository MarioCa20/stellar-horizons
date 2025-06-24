// Hook para filtrar y ordenar alojamientos
import { useMemo } from "react";

export function useFilteredAccommodations(accommodations, filters) {
  return useMemo(() => {
    let result = accommodations;

    if (filters.destinationId !== null) {
      result = result.filter(a => a.destinationId === filters.destinationId);
    }

    if (filters.maxPrice !== null) {
      result = result.filter(a => a.price <= filters.maxPrice);
    }

    if (filters.sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [accommodations, filters]);
}
