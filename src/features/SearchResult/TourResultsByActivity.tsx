import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  getToursByActivityId,
  getActivities,
  type Tour,
  type Activity,
} from "../../utils/api";
import { TourFilters } from "../../components/Filters/TourFilters";
import { TourResultCardList } from "../../components/ResultsCards/TourResultCard";
import { useTourFilters } from "../../hooks/useTourFilters";

export const TourResultsByActivity = () => {
  const { activityId } = useParams();
  const activityIdNumber = Number(activityId);

  const baseTours: Tour[] = getToursByActivityId(activityIdNumber);
  const activities: Activity[] = getActivities();
  const durations: string[] = [...new Set(baseTours.map((t) => t.duration))];

  const [filters, setFilters] = useState({
    maxPrice: null as number | null,
    sortOrder: null as "asc" | "desc" | null,
    activityId: activityIdNumber || null,
    duration: null as string | null,
  });

  const filteredTours = useTourFilters({
    tours: baseTours,
    ...filters,
  });

  const activity = activities.find((a) => a.id === activityIdNumber);

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <h2 className='resultado'>
        Tours para la actividad:{" "}
        <span>{activity ? activity.name : "Actividad desconocida"}</span>
      </h2>

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