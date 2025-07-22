import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { ReviewCard } from "../../components/ReviewCard";
import { useEnrichedReviews } from "../../hooks/useEnrichedReviews";
import { getAccommodationById, type Accommodation } from "../../utils/api";
import styles from "../ToursDetails/TourDetails.module.css";
import { useEffect, useState } from "react";
import { AddReviewModal } from "../../components/addReviewModal";
import { useAuth } from "../../hooks/useAuth";

export const AccommodationsDetails = () => {
  const isAuth = useAuth();
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState<Accommodation | undefined>(undefined);
  const reviews = useEnrichedReviews();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadAccommodation = async () => {
      if (accommodationId) {
        const data = await getAccommodationById(Number(accommodationId));
        setAccommodation(data);
      }
    };
    loadAccommodation();
  }, [accommodationId]);

  const handleSubmitReview = (rating: number, comment: string) => {
    console.log("Nueva reseña:", { rating, comment });
    // Aquí va el POST a la API
    setShowModal(false);
  };

  if (!accommodation) return <p>Cargando información del alojamiento...</p>;
  if (!reviews) return <p>Cargando reseñas...</p>;
    
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
            />
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
            </Card.Body>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 className="d-flex justify-content-center">Reseñas destacadas</h3>
        {isAuth && (
                <div className="d-flex justify-content-end mt-3">
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    Agregar Reseña
                  </Button>
                </div>
              )}
        <Row xs={1} md={2} lg={3} className="g-4 mt-1">
          {reviews.map((review) => (
            <Col key={review.id}>
              <ReviewCard review={review} />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
      <AddReviewModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitReview}
      />
    </Container>
  );
};
