import { getTours, type Tour } from "../../utils/api";
import { TourCardList } from "../../components/ResultsCards/TourResultCard";

/**
 * Componente para mostrar todos los tours disponibles.
 * Utiliza la función getTours para obtener la lista de tours.
 * Muestra un mensaje si no hay tours disponibles.
 */

export const AllTours = () => {
  const tours: Tour[] = getTours();

  return (
    <div style={{ padding: "2rem 2rem" }}>
      <h2 className='resultado'>Todos los Tours Disponibles</h2>
      {tours.length === 0 ? (
        <p>No hay tours disponibles.</p>
      ) : (
        <TourCardList tours={tours} />
      )}
    </div>
  );
};