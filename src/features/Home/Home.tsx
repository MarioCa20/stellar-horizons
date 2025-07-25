import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AccommodationCard } from '../../components/Accommodation/AccommodationCard';
import { AccommodationSearch } from '../../components/Accommodation/AccommodationSearch';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar/Navbar';
import { TourCard } from '../../components/Tour/TourCard';
import { TourSearch } from '../../components/Tour/TourSearch';
import { useAuth } from '../../hooks/useAuth';
import * as api from '../../utils/api';

export const Home = () => {
  const [tours, setTours] = useState<api.Tour[]>([]);
  const [alojamientos, setAlojamientos] = useState<api.Accommodation[]>([]);
  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    api.getTours().then(data => setTours(Array.isArray(data) ? data : []));
    api.getAccommodations().then(data => setAlojamientos(Array.isArray(data) ? data : []));
  }, []);

  const featuredTours = Array.isArray(tours) ? tours.slice(0, 4) : [];
  const featuredAlojamientos = Array.isArray(alojamientos) ? alojamientos.slice(0, 4) : [];

  const handleTourClick = (tourId: number) => {
    if (isAuth) {
      navigate('/bookings', { state: { tourId } });
    }
  };

  const handleAccommodationClick = (accommodationId: number) => {
    if (isAuth) {
      navigate('/bookings', { state: { accommodationId } });
    }
  };

  return (
    <>
      <Navbar />
        <Container className="my-5">
          <Row className="mb-4">
            <Col md={6}>
              <TourSearch />
            </Col>
            <Col md={6}>
              <AccommodationSearch />
            </Col>
        </Row>

        <h3 className="mb-4">Tours Recomendados</h3>
        <Row xs={1} sm={2} md={4} className="g-4">
          {featuredTours.map(tour => (
            <Col key={tour.id}>
              <div
                style={isAuth ? { cursor: 'pointer' } : {}}
                onClick={isAuth ? () => handleTourClick(tour.id) : undefined}
                tabIndex={isAuth ? 0 : -1}
                role={isAuth ? "button" : undefined}
                aria-label={isAuth ? "Reservar este tour" : undefined}
              >
                <TourCard tour={tour} />
              </div>
            </Col>
          ))}
        </Row>
        
        <div className="my-5 p-4 text-center bg-light rounded shadow-sm">
          <h3>🌌 ¡Descubre tu próximo destino interestelar!</h3>
          <p className="lead">Viajes únicos, experiencias inigualables. Reserva hoy mismo.</p>
          <Button variant="outline-primary" href="/tours/all">
            Explorar todos los tours
          </Button>
        </div>

        <h3 className="mb-4">Alojamientos Recomendados</h3>
        <Row xs={1} sm={2} md={4} className="g-4">
          {featuredAlojamientos.map(alojamiento => (
            <Col key={alojamiento.id}>
              <div
                style={isAuth ? { cursor: 'pointer' } : {}}
                onClick={isAuth ? () => handleAccommodationClick(alojamiento.id) : undefined}
                tabIndex={isAuth ? 0 : -1}
                role={isAuth ? "button" : undefined}
                aria-label={isAuth ? "Reservar este alojamiento" : undefined}
              >
                <AccommodationCard accommodation={alojamiento} />
              </div>
            </Col>
          ))}
        </Row>

        <div className="my-5 p-4 text-center bg-light rounded shadow-sm">
          <h3>🏨 Encuentra tu hogar en las estrellas</h3>
          <p className="lead">Alojamientos únicos en los mejores planetas. Reserva ahora.</p>
          <Button variant="outline-primary" href="/accommodations/all">
            Ver todos los alojamientos
          </Button>
        </div>

      </Container>
      <Footer />
    </>
  );
};
