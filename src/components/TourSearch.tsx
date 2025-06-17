import { Form, Row, Col } from 'react-bootstrap';

interface Props {
  onSearch: (searchTerm: string) => void;
}

export const TourSearch = ({ onSearch }: Props) => {
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
            <h2 className="text-left mb-3">Paquetes</h2>
            <Col>
              <Form.Control
                placeholder="Buscar por nombre..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};