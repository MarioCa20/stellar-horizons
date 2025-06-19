import { getAccommodations, type Accommodation } from "../../utils/api";
import { AccommodationCardList } from "../../components/ResultsCards/AccommodationResultCard";

/**
 * Componente para mostrar todos los alojamientos disponibles.
 * Utiliza la función getAccommodations para obtener la lista de alojamientos.
 * Muestra un mensaje si no hay alojamientos disponibles.
 */

export const AllAccommodations = () => {
  const accommodations: Accommodation[] = getAccommodations();

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <h2 className='resultado'>Todos los Alojamientos</h2>
      {accommodations.length === 0 ? (
        <p>No hay alojamientos disponibles.</p>
      ) : (
        <AccommodationCardList accommodations={accommodations} />
      )}
    </div>
  );
};
