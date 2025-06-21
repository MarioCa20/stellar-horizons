import { Form, Row, Col } from "react-bootstrap";
import { type Activity } from "../../utils/api";

interface Props {
  filters: {
    maxPrice?: number | null;
    sortOrder?: "asc" | "desc" | null;
    activityId?: number | null;
    duration?: string | null;
  };
  onChange: (filters: Props["filters"]) => void;
  activities: Activity[];
  durations: string[];
}

export const TourFilters = ({ filters, onChange, activities, durations }: Props) => {
  return (
    <Form className="mb-4">
      <Row className="gy-2 gx-3 align-items-center">
        <Col md>
          <Form.Label>Actividad</Form.Label>
          <Form.Select
            value={filters.activityId ?? ""}
            onChange={(e) =>
              onChange({ ...filters, activityId: e.target.value ? Number(e.target.value) : null })
            }
          >
            <option value="">Todas</option>
            {activities.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md>
          <Form.Label>Duración</Form.Label>
          <Form.Select
            value={filters.duration ?? ""}
            onChange={(e) =>
              onChange({ ...filters, duration: e.target.value || null })
            }
          >
            <option value="">Todas</option>
            {durations.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md>
          <Form.Label>Precio máximo ($)</Form.Label>
          <Form.Control
            type="number"
            min={0}
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
              onChange({ ...filters, sortOrder: e.target.value as "asc" | "desc" })
            }
          >
            <option value="">-- Sin ordenar --</option>
            <option value="asc">Precio más bajo</option>
            <option value="desc">Precio más alto</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};