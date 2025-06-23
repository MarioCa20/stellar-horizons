import { Button, Card, Col, Row } from "react-bootstrap";
import { type Accommodation } from "../../utils/api";

interface Props {
  accommodations: Accommodation[];
}

export const AccommodationResultCardList = ({ accommodations }: Props) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {accommodations.map((acc) => (
        <Col key={acc.id}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Img
              variant="top"
              style={{ height: "300px", objectFit: "cover" }}
              src={`/images/${acc.image}`}
            />
            <Card.Body>
              <Card.Title>{acc.name}</Card.Title>
              <Card.Text>{acc.description}</Card.Text>
              <div className="d-flex justify-content-between mt-3">
                <span>
                  <strong>Habitaciones:</strong> {acc.rooms}
                </span>
                <span>
                  <strong>${acc.price}</strong>
                </span>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    (window.location.href = `/accommodations/${acc.id}`)
                  }
                >
                  Ver más detalles
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
