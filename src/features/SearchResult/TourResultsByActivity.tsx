import { useEffect, useState } from "react";
import { TourResultCardList } from "../../components/ResultsCards/TourResultCard";
import { useParams } from "react-router-dom";
import { TourFilters } from "../../components/Filters/TourFilters";
import { getActivities, getFilteredTours, type Tour, type Activity } from "../../utils/api";
import { useNavigate } from 'react-router-dom';

export const TourResultsByActivity = () => {
  const { activityId } = useParams();
  const id = Number(activityId);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<{
    maxPrice?: number | null;
    sortOrder?: "asc" | "desc" | null;
    activityId?: number | null;
    duration?: string | null;
  }>({
    maxPrice: null,
    sortOrder: null,
    activityId: id || null,
    duration: null,
  });

  const [tours, setTours] = useState<Tour[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [durations, setDurations] = useState<string[]>([]);
  const [activityName, setActivityName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const allActivities = await getActivities();
      setActivities(allActivities);

      if (activityId) {
        const found = allActivities.find((a) => a.id === id);
        if (found) setActivityName(found.name);

        const filtered = await getFilteredTours({ activity: id });
        setTours(filtered);

        const uniqueDurations = Array.from(new Set(filtered.map((t) => t.duration)));
        setDurations(uniqueDurations);
      }
    };

    fetchData();
  }, [activityId]);

  // 👉 Detecta si el filtro de actividad cambia
  useEffect(() => {
    if (filters.activityId !== null && filters.activityId !== id) {
      navigate(`/tours/activity/${filters.activityId}`);
    } else if (filters.activityId === null) {
      navigate(`/tours/all`);
    }
  }, [filters.activityId]);

  const filteredTours = [...tours]
    .filter((t) => !filters.maxPrice || t.price <= filters.maxPrice)
    .filter((t) => !filters.duration || t.duration === filters.duration)
    .sort((a, b) => {
      if (!filters.sortOrder) return 0;
      return filters.sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <h2 className='resultado'>
        Tours para la actividad:{" "}
        <span>{activityName ? activityName : "Actividad desconocida"}</span>
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
