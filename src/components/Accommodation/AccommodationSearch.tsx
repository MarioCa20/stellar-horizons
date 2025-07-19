import { Form, Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getPlanets, type Planet } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export const AccommodationSearch = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const navigate = useNavigate();

 useEffect(() => {
     getPlanets().then(setPlanets);
   }, []);

  const handleSearchClick = () => {
    if (selectedPlanet !== null) {
      navigate(`/accommodations/planet/${selectedPlanet}`);
    } else {
      navigate(`/accommodations/all`);
    }
  };

  return (
    <div style={{ padding: '0.5cm 1cm 3.5rem 1cm', margin: '0 auto' }}>
      <div
        style={{
          padding: '1rem',
          paddingBottom: '2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <Form className="d-flex flex-wrap justify-content-center gap-2">
          <Row className="w-100 justify-content-center">
            <h2 className="text-left mb-3">Alojamientos</h2>
            <Col md>
              <Form.Select
                value={selectedPlanet ?? ''}
                onChange={(e) =>
                  setSelectedPlanet(e.target.value ? Number(e.target.value) : null)
                }
                style={{ height: '100%' }}
              >
                {selectedPlanet === null && (
                  <option value="">Planeta</option>
                )}
                {planets.map((planet) => (
                  <option key={planet.id} value={planet.id}>
                    {planet.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handleSearchClick}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};