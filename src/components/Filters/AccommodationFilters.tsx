import { Form, Row, Col } from "react-bootstrap";
import { type Destination } from "../../utils/api";

interface Props {
  filters: {
    destinationId: number | null;
    maxPrice: number | null;
    sortOrder: "asc" | "desc" | null;
  };
  onChange: (filters: Props["filters"]) => void;
  destinations: Destination[];
}

export const AccommodationFilters = ({ filters, onChange, destinations }: Props) => {
  return (
    <Form className="mb-4">
      <Row className="gy-3 gx-3 align-items-center">
        <Col md>
          <Form.Label>Destino</Form.Label>
          <Form.Select
            value={filters.destinationId ?? ""}
            onChange={(e) =>
              onChange({ ...filters, destinationId: e.target.value ? Number(e.target.value) : null })
            }
          >
            <option value="">Todos</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md>
          <Form.Label>Precio máximo ($)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            placeholder="Sin límite"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : null })
            }
          />
        </Col>

        <Col md>
          <Form.Label>Ordenar por precio</Form.Label>
          <Form.Select
            value={filters.sortOrder ?? ""}
            onChange={(e) =>
              onChange({ ...filters, sortOrder: e.target.value ? (e.target.value as "asc" | "desc") : null })
            }
          >
            <option value="">Sin orden</option>
            <option value="asc">Precio más bajo</option>
            <option value="desc">Precio más alto</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};
