import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => (
  <footer className="bg-dark text-light py-4 mt-5">
    <Container>
      <Row className="align-items-center">
        <Col md={8}>
          <h5>Stellar Horizons</h5>
          <p className="mb-1">
            Somos un equipo de desarrolladores apasionados creando experiencias únicas para tus viajes espaciales.
          </p>
          <p className="mb-0">
            Contáctanos: equipo@stellarhorizons.com
          </p>
        </Col>
        <Col md={3}>
          <h6>Síguenos</h6>
          <ul className="list-unstyled mb-0">
            <li><a href="#" className="text-light text-decoration-none">Twitter</a></li>
            <li><a href="#" className="text-light text-decoration-none">Instagram</a></li>
            <li><a href="#" className="text-light text-decoration-none">Facebook</a></li>
          </ul>
        </Col>
      </Row>
      <hr className="border-secondary" />
      <p className="text-center small mb-0">
        &copy; Stellar Horizons 2025. Todos los derechos reservados.
      </p>
    </Container>
  </footer>
);
