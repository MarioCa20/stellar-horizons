import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getPlanetById,
  getDestinations,
  getAccommodations,
  type Accommodation,
  type Destination,
  type Planet,
} from "../../utils/api";
import { AccommodationResultCardList } from "../../components/ResultsCards/AccommodationResultCard";
import { AccommodationFilters } from "../../components/Filters/AccommodationFilters";

export const AccommodationResultsByPlanet = () => {
  const { planetId } = useParams();
  const id = Number(planetId);
  console.log("Planet ID:", id);

  const [planet, setPlanet] = useState<Planet | undefined>(undefined);
  const [planetDestinations, setPlanetDestinations] = useState<Destination[]>([]);
  const [allAccommodations, setAllAccommodations] = useState<Accommodation[]>([]);
  const [filtered, setFiltered] = useState<Accommodation[]>([]);
  console.log("Planet Destinations:", planetDestinations);
  console.log("All Accommodations:", allAccommodations);
  console.log("Planet:", planet);

  const [filters, setFilters] = useState<{
    destinationId: number | null;
    maxPrice: number | null;
    sortOrder: "asc" | "desc" | null;
  }>({
    destinationId: null,
    maxPrice: null,
    sortOrder: null,
  });

  // Obtener datos base: planeta, destinos y alojamientos
  useEffect(() => {
    if (!id) return;

    // Obtener datos del planeta
    getPlanetById(id).then((data) => {
      setPlanet(data);
      console.log("Planeta obtenido:", data);
    });

    // Obtener destinos y filtrar los del planeta actual
      getDestinations().then((dest) => {
        const filteredDestinations = dest.filter((d) => d.id === id);
        setPlanetDestinations(filteredDestinations);
    });

    // Obtener todos los alojamientos
    getAccommodations().then((acc) => {
      setAllAccommodations(acc);
    });
  }, [id]);

  // Aplicar filtros cuando cambien filtros, destinos o alojamientos
  useEffect(() => {
    const validDestinationIds = planetDestinations.map((d) => d.id);
    console.log("IDs válidos de destinos:", validDestinationIds);
  
    let filteredAccs = allAccommodations.filter((acc) =>
      validDestinationIds.includes(acc.id)
  );

    if (filters.destinationId !== null) {
      filteredAccs = filteredAccs.filter(
        (acc) => acc.id === filters.destinationId
      );
    }

    if (filters.maxPrice !== null) {
      filteredAccs = filteredAccs.filter((acc) => acc.price <= filters.maxPrice!);
    }

    if (filters.sortOrder === "asc") {
      filteredAccs.sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === "desc") {
      filteredAccs.sort((a, b) => b.price - a.price);
    }

    setFiltered(filteredAccs);
  }, [filters, planetDestinations, allAccommodations]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 className="resultado">
        Alojamientos en{" "}
        <span>{planet ? planet.name : "planeta desconocido"}</span>
      </h2>

      <AccommodationFilters
        filters={filters}
        onChange={setFilters}
        destinations={planetDestinations}
      />

      {filtered.length === 0 ? (
        <p>No hay alojamientos en este planeta con los filtros seleccionados.</p>
      ) : (
        <AccommodationResultCardList accommodations={filtered} />
      )}
    </div>
  );
};
