import { useState, useEffect } from "react";
import { getFilteredTours, getActivities, getTours, type Tour, type Activity} from "../../utils/api";
import { TourFilters } from "../../components/Filters/TourFilters";
import { TourResultCardList } from "../../components/ResultsCards/TourResultCard";
import { useNavigate } from "react-router-dom";

export const AllTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [durations, setDurations] = useState<string[]>([]);

  const [filters, setFilters] = useState<{
    activityId: number | null;
    duration: string | null;
    maxPrice: number | null;
    sortOrder: "asc" | "desc" | null;
  }>({
    activityId: null,
    duration: null,
    maxPrice: null,
    sortOrder: null,
  });

  const navigate = useNavigate();

  // Navegar si selecciona una actividad específica
  useEffect(() => {
    if (filters.activityId !== null) {
      navigate(`/tours/activity/${filters.activityId}`);
    }
  }, [filters.activityId]);

  // Cargar actividades y duraciones una sola vez
  useEffect(() => {
    getActivities().then(setActivities);
    getTours().then((all) => {
      const uniqueDurations = [...new Set(all.map((t) => t.duration))];
      setDurations(uniqueDurations);
      setTours(all); // Mostrar todos inicialmente
    });
  }, []);

  // Aplica solo filtros que no sean de actividad
  useEffect(() => {
    if (filters.activityId === null) {
      getFilteredTours({
        duration: filters.duration ?? null,
        max_price: filters.maxPrice ?? null,
      }).then((results) => {
        let sorted = [...results];
        if (filters.sortOrder === "asc") {
          sorted.sort((a, b) => a.price - b.price);
        } else if (filters.sortOrder === "desc") {
          sorted.sort((a, b) => b.price - a.price);
        }
        setTours(sorted);
      });
    }
  }, [filters.duration, filters.maxPrice, filters.sortOrder]);

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <h2 className="resultado">Todos los Tours Disponibles</h2>

      <TourFilters
        filters={filters}
        onChange={setFilters}
        activities={activities}
        durations={durations}
      />

      {tours.length === 0 ? (
        <p>No hay tours disponibles con los filtros seleccionados.</p>
      ) : (
        <TourResultCardList tours={tours} />
      )}
    </div>
  );
};
