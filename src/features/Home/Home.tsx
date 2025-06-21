import { Container, Row, Col, Button } from 'react-bootstrap';
import * as api from '../../utils/api';
import { Footer } from '../../components/Footer';
import { TourSearch } from '../../components/TourSearch';
import { AccommodationSearch } from '../../components/AccommodationSearch';
import { TourCard } from '../../components/TourCard';
import { AccommodationCard } from '../../components/AccommodationCard';
import { Navbar } from '../../components/Navbar/Navbar';

export const Home = () => {
  const tours = api.getTours().slice(0, 4); // 4 paquetes recomendados
  const alojamientos = api.getAccommodations().slice(0, 4); // 4 alojamientos recomendados

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
          {tours.map(tour => (
            <Col key={tour.id}>
              <TourCard tour={tour} />
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
          {alojamientos.map(alojamiento => (
            <Col key={alojamiento.id}>
              <AccommodationCard accommodation={alojamiento} />
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
