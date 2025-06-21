import { useState } from "react";
import {
  getTours,
  getActivities,
  type Tour,
  type Activity,
} from "../../utils/api";
import { TourFilters } from "../../components/Filters/TourFilters";
import { TourResultCardList } from "../../components/ResultsCards/TourResultCard";
import { useTourFilters } from "../../hooks/useTourFilters";

/**
 * Componente para mostrar todos los tours disponibles.
 * Utiliza la función getTours para obtener la lista de tours.
 * Muestra un mensaje si no hay tours disponibles.
 */

export const AllTours = () => {
  const allTours: Tour[] = getTours();
  const activities: Activity[] = getActivities();
  const durations: string[] = [...new Set(allTours.map((t) => t.duration))];

  const [filters, setFilters] = useState({
    maxPrice: null as number | null,
    sortOrder: null as "asc" | "desc" | null,
    activityId: null as number | null,
    duration: null as string | null,
  });

  const filteredTours = useTourFilters({
    tours: allTours,
    ...filters,
  });

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <h2 className='resultado'>Todos los Tours Disponibles</h2>

      <TourFilters
        filters={filters}
        onChange={setFilters}
        activities={activities}
        durations={durations}
      />

      {filteredTours.length === 0 ? (
        <p>No hay tours disponibles con los filtros seleccionados.</p>
      ) : (
        <TourResultCardList tours={filteredTours} />
      )}
    </div>
  );
};