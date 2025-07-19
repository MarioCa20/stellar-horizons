import { useState, useEffect } from "react";
import { getDestinations, getFilteredAccommodations, type Accommodation, type Destination} from "../../utils/api";
import { AccommodationResultCardList } from "../../components/ResultsCards/AccommodationResultCard";
import { AccommodationFilters } from "../../components/Filters/AccommodationFilters";

export const AllAccommodations = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [filters, setFilters] = useState<{
    destinationId: number | null;
    maxPrice: number | null;
    sortOrder: "asc" | "desc" | null;
  }>({
    destinationId: null,
    maxPrice: null,
    sortOrder: null,
  });

  // Cargar destinos una sola vez
  useEffect(() => {
    getDestinations().then(setDestinations);
  }, []);

  // Cargar alojamientos al cambiar filtros
  useEffect(() => {
    getFilteredAccommodations({
      planet: filters.destinationId ?? null,
      max_price: filters.maxPrice ?? null,
    }).then((results) => {
      let sorted = [...results];
      if (filters.sortOrder === "asc") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (filters.sortOrder === "desc") {
        sorted.sort((a, b) => b.price - a.price);
      }
      setAccommodations(sorted);
    });
  }, [filters]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 className="resultado">Todos los Alojamientos</h2>

      <AccommodationFilters
        filters={filters}
        onChange={setFilters}
        destinations={destinations}
      />

      {accommodations.length === 0 ? (
        <p>No hay alojamientos disponibles con los filtros seleccionados.</p>
      ) : (
        <AccommodationResultCardList accommodations={accommodations} />
      )}
    </div>
  );
};
