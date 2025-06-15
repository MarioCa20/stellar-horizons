import { Form, Button, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Activity, getActivities } from '../utils/api';

interface Props {
  onSearch: (filters: { activityId?: number | null }) => void;
}

export const TourSearch = ({ onSearch }: Props) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const handleSearchClick = () => {
    onSearch({ activityId: selectedActivity });
  };

return (
  <div style={{ padding: '0.5cm 1cm 3.5rem 1cm', margin: '0 auto' }}>
    <div
      style={{
        padding: '1rem',
        paddingBottom: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        maxWidth: '1000px', // Limita el ancho total
        margin: '0 auto', // Centrado horizontal
      }}
    >
      <Form className="d-flex flex-wrap justify-content-center gap-2">
        <Row className="w-100 justify-content-center">
        <h2 className="text-left mb-3">Paquetes</h2>
          <Col md>
            <Form.Select
              value={selectedActivity ?? ''}
              onChange={(e) =>
                setSelectedActivity(e.target.value ? Number(e.target.value) : null)
              }
              style={{ height: '100%' }}
            >
              <option value="">Activities</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md>
            <Form.Control placeholder="From" />
          </Col>
          <Col md>
            <Form.Control placeholder="To" />
          </Col>
          <Col md>
            <Form.Control placeholder="Planet" />
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