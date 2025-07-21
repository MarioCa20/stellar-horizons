import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getTourById, type Tour} from "../../utils/api";
import styles from "./TourDetails.module.css";
import { Footer } from "../../components/Footer";
import { useEnrichedReviews } from "../../hooks/useEnrichedReviews";
import { ReviewCard } from "../../components/ReviewCard";

export const TourDetails = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState<Tour | undefined>(undefined);
  const reviews = useEnrichedReviews();

  useEffect(() => {
    const loadTour = async () => {
      if (tourId) {
        const data = await getTourById(Number(tourId));
        setTour(data);
      }
    };

    loadTour();
  }, [tourId]);

  if (!tour) return <p>Cargando información del tour...</p>;

  return (
    <Container style={{ padding: "1rem" }}>
      <h2 className="resultado mt-3">Detalle del Tour</h2>
      <div className={styles.container}>
        <div>
          <Card>
            <Card.Img
              variant="top"
              src={tour.image}
              style={{ height: "50vh", objectFit: "cover" }}
            />
            <Card.Body>
              <Card.Title>{tour.name}</Card.Title>
              <Card.Text>{tour.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div>
          <Card>
            <Card.Header>Detalles</Card.Header>
            <Card.Body>
              <Card.Title className="d-flex justify-content-between">
                <span>Precio:</span>
                <small className="text-muted">${tour.price}</small>
              </Card.Title>
              <Card.Title className="d-flex justify-content-between">
                <span>Duración:</span>
                <small className="text-muted">{tour.duration}</small>
              </Card.Title>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary">Comprar</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 className="d-flex justify-content-center">Reseñas destacadas</h3>
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
