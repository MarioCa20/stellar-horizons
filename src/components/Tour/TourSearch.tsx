import { Form, Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { type Activity, getActivities } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export const TourSearch = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const handleSearchClick = () => {
  if (selectedActivity !== null) {
    navigate(`/tours/activity/${selectedActivity}`);
  } else {
    navigate(`/tours/all`); // si no se selecciona ninguna actividad, redirige a todos los tours
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
            <h2 className="text-left mb-3">Tours</h2>
            <Col md>
              <Form.Select
              value={selectedActivity ?? ''}
              onChange={(e) =>
                setSelectedActivity(e.target.value ? Number(e.target.value) : null)
              }
              style={{ height: '100%' }}
            >
              <option value="">Actividad</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
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