import { Container, Row, Col } from 'react-bootstrap';
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
        <TourSearch />
        <AccommodationSearch/>

        <h3 className="mb-4">Tours Recomendados</h3>
        <Row xs={1} sm={2} md={4} className="g-4">
          {tours.map(tour => (
            <Col key={tour.id}>
              <TourCard tour={tour} />
            </Col>
          ))}
        </Row>

        <h3 className="mb-4">Alojamientos Recomendados</h3>
        <Row xs={1} sm={2} md={4} className="g-4">
          {alojamientos.map(alojamiento => (
            <Col key={alojamiento.id}>
              <AccommodationCard accommodation={alojamiento} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};
