import { Card, Row, Col, Button } from "react-bootstrap";
import { type Accommodation } from "../../utils/api";
import { useNavigate } from "react-router-dom";

interface Props {
  accommodations: Accommodation[];
}

export const AccommodationCardList = ({ accommodations }: Props) => {
  const navigate = useNavigate();

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {accommodations.map((acc) => (
        <Col key={acc.id}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Img
              variant="top"
              src={`/images/${acc.image}`}
            />
            <Card.Body>
              <Card.Title>{acc.name}</Card.Title>
              <Card.Text>{acc.description}</Card.Text>
              <div className="d-flex justify-content-between mt-3">
                <span><strong>Habitaciones:</strong> {acc.rooms}</span>
                <span><strong>${acc.price}</strong></span>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/accommodations/${acc.id}`)}
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