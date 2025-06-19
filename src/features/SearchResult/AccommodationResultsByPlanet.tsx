import { useParams } from "react-router-dom";
import { getAccommodationsByPlanetId, getPlanets, type Accommodation} from "../../utils/api";
import { AccommodationCardList } from "../../components/ResultsCards/AccommodationResultCard";

export const AccommodationResultsByPlanet = () => {
  const { planetId } = useParams();
  const id = Number(planetId);

  const accommodations: Accommodation[] = getAccommodationsByPlanetId(id);
  const planet = getPlanets().find((p) => p.id === id);

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <h2 className='resultado'>
        Alojamientos en{" "}
        <span>
          {planet ? planet.name : "planeta desconocido"}
        </span>
      </h2>

      {accommodations.length === 0 ? (
        <p>No hay alojamientos en este planeta.</p>
      ) : (
        <AccommodationCardList accommodations={accommodations} />
      )}
    </div>
  );
};