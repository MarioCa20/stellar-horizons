import { useParams } from "react-router-dom";
import { getToursByActivityId, getActivities, type Tour, type Activity } from "../../utils/api";
import { TourCardList } from "../../components/ResultsCards/TourResultCard";

export const TourResultsByActivity = () => {
  const { activityId } = useParams();
  const activityIdNumber = Number(activityId);

  const tours: Tour[] = getToursByActivityId(activityIdNumber);
  const activities: Activity[] = getActivities();
  const activity = activities.find((act) => act.id === activityIdNumber);

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <h2 className='resultado'>
        Tours para la actividad:{" "}
        <span>
          {activity ? activity.name : "Actividad desconocida"}
        </span>
      </h2>

      {tours.length === 0 ? (
        <p>No hay tours con esta actividad</p>
      ) : (
        <TourCardList tours={tours} />
      )}
    </div>
  );
};