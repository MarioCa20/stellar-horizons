import { useState } from "react";
import { getAccommodations, getDestinations } from "../../utils/api";
import { AccommodationResultCardList } from "../../components/ResultsCards/AccommodationResultCard";
import { useFilteredAccommodations } from "../../hooks/useAccommodationFilters";
import { AccommodationFilters } from "../../components/Filters/AccommodationFilters";

/**
 * Componente para mostrar todos los alojamientos disponibles.
 * Utiliza la función getAccommodations para obtener la lista de alojamientos.
 * Muestra un mensaje si no hay alojamientos disponibles.
 */

export const AllAccommodations = () => {
  const allAccommodations = getAccommodations();
  const destinations = getDestinations();

  const [filters, setFilters] = useState<{
    destinationId: number | null;
    maxPrice: number | null;
    sortOrder: "asc" | "desc" | null;
  }>({
    destinationId: null,
    maxPrice: null,
    sortOrder: null,
  });

  const filtered = useFilteredAccommodations(allAccommodations, filters);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 className="resultado">Todos los Alojamientos</h2>

      <AccommodationFilters
        filters={filters}
        onChange={setFilters}
        destinations={destinations}
      />

      {filtered.length === 0 ? (
        <p>No hay alojamientos disponibles con los filtros aplicados.</p>
      ) : (
        <AccommodationResultCardList accommodations={filtered} />
      )}
    </div>
  );
};
