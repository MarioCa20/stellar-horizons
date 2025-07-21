import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { ReviewCard } from "../../components/ReviewCard";
import { useEnrichedReviews } from "../../hooks/useEnrichedReviews";
import { getAccommodationById, type Accommodation } from "../../utils/api";
import styles from "../ToursDetails/TourDetails.module.css";
import { useEffect, useState } from "react";

export const AccommodationsDetails = () => {
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState<Accommodation | undefined>(undefined);
  const reviews = useEnrichedReviews();

  useEffect(() => {
    const fetchAccommodation = async () => {
      console.log("Fetching accommodation with ID:", accommodationId);
      if (accommodationId) {
        const data = await getAccommodationById(Number(accommodationId));
        setAccommodation(data);
        console.log("Accommodation data:", data);
      }
    };
    fetchAccommodation();
  }, [accommodationId]);

  return (
    <Container style={{ padding: "1rem" }}>
      <h2 className="resultado mt-3">Detalle del Alojamiento</h2>
      <div className={styles.container}>
        <div>
          <Card>
            <Card.Img
              variant="top"
              src={accommodation?.image}
              style={{ height: "50vh", objectFit: "cover" }}
            ></Card.Img>
            <Card.Body>
              <Card.Title>{accommodation?.name}</Card.Title>
              <Card.Text>{accommodation?.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div>
          <Card>
            <Card.Header>Detalles</Card.Header>
            <Card.Body>
              <Card.Title className="d-flex justify-content-between">
                <span>Precio:</span>
                <small className="text-muted">${accommodation?.price}</small>
              </Card.Title>
              <Card.Title className="d-flex justify-content-between">
                <span>Habitaciones:</span>
                <small className="text-muted">{accommodation?.rooms}</small>
              </Card.Title>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary">Comprar</Button>
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
