import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { ReviewCard } from "../../components/ReviewCard";
import { useEnrichedReviews } from "../../hooks/useEnrichedReviews";
import { getAccommodationsById } from "../../utils/api";
import styles from "../ToursDetails/TourDetails.module.css";

export const AccommodationsDetails = () => {
  const { accommodationId } = useParams();
  const accommdation = getAccommodationsById(Number(accommodationId));
  const reviews = useEnrichedReviews();

  return (
    <Container style={{ padding: "1rem" }}>
      <h2 className="resultado mt-3">Detalle del Alojamiento</h2>
      <div className={styles.container}>
        <div>
          <Card>
            <Card.Img
              variant="top"
              src={`/images/${accommdation?.image}`}
              style={{ height: "50vh", objectFit: "cover" }}
            ></Card.Img>
            <Card.Body>
              <Card.Title>{accommdation?.name}</Card.Title>
              <Card.Text>{accommdation?.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div>
          <Card>
            <Card.Header>Detalles</Card.Header>
            <Card.Body>
              <Card.Title className="d-flex justify-content-between">
                <span>Precio:</span>
                <small className="text-muted">${accommdation?.price}</small>
              </Card.Title>
              <Card.Title className="d-flex justify-content-between">
                <span>Habitaciones:</span>
                <small className="text-muted">{accommdation?.rooms}</small>
              </Card.Title>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary">Agregar</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 className="d-flex justify-content-center">Reseñas descatadas</h3>
        <Row xs={1} md={2} lg={3} className="g-4 mt-1">
          {reviews.map((review) => (
            <Col key={review.id}>
              <ReviewCard review={review} />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </Container>
  );
};
