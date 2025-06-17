import { Container, Row, Col } from 'react-bootstrap';
import * as api from '../../utils/api';
import { Footer } from '../../components/Footer';
import { TourSearch } from '../../components/TourSearch';
import { TourCard } from '../../components/TourCard';
import { Navbar } from '../../components/Navbar/Navbar';
import { useState } from 'react';

export const Home = () => {
  const allTours = api.getTours();
  const [filteredTours, setFilteredTours] = useState(allTours.slice(0, 4));

  const handleSearch = (searchTerm: string) => {
    const filtered = searchTerm
      ? allTours.filter(tour => 
          tour.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allTours.slice(0, 4);
    setFilteredTours(filtered);
  };

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <TourSearch onSearch={handleSearch} />

        <h3 className="mb-4">Tours Recomendados</h3>
        <Row xs={1} sm={2} md={4} className="g-4">
          {filteredTours.map(tour => (
            <Col key={tour.id}>
              <TourCard tour={tour} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};
