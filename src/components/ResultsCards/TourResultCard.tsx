import { Button, Card, Col, Row } from "react-bootstrap";
import { type Tour } from "../../utils/api";

interface Props {
  tours: Tour[];
}

export const TourResultCardList = ({ tours }: Props) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {tours.map((tour) => (
        <Col key={tour.id}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Img
              variant="top"
              style={{ height: "300px", objectFit: "cover" }}
              src={tour.image}
            />
            <Card.Body>
              <Card.Title>{tour.name}</Card.Title>
              <Card.Text>{tour.description}</Card.Text>
              <div className="d-flex justify-content-between mt-3">
                <span>
                  <strong>Duración:</strong> {tour.duration}
                </span>
                <span>
                  <strong>${tour.price}</strong>
                </span>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => (window.location.href = `/tours/${tour.id}`)}
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
