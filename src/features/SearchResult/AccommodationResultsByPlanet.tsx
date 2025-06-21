import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  getAccommodationsByPlanetId,
  getPlanets,
  getDestinations,
} from "../../utils/api";
import { useFilteredAccommodations } from "../../hooks/useAccommodationFilters";
import { AccommodationResultCardList } from "../../components/ResultsCards/AccommodationResultCard";
import { AccommodationFilters } from "../../components/Filters/AccommodationFilters";

export const AccommodationResultsByPlanet = () => {
  const { planetId } = useParams();
  const id = Number(planetId);

  const accommodations = getAccommodationsByPlanetId(id);
  const planet = getPlanets().find((p) => p.id === id);
  const destinations = getDestinations().filter((d) => d.planetId === id);

  const [filters, setFilters] = useState<{
    destinationId: number | null;
    maxPrice: number | null;
    sortOrder: "asc" | "desc" | null;
  }>({
    destinationId: null,
    maxPrice: null,
    sortOrder: null,
  });

  const filtered = useFilteredAccommodations(accommodations, filters);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 className="resultado">
        Alojamientos en <span>{planet ? planet.name : "planeta desconocido"}</span>
      </h2>

      <AccommodationFilters
        filters={filters}
        onChange={setFilters}
        destinations={destinations}
      />

      {filtered.length === 0 ? (
        <p>No hay alojamientos en este planeta con los filtros seleccionados.</p>
      ) : (
        <AccommodationResultCardList accommodations={filtered} />
      )}
    </div>
  );
};