import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => (
  <footer className="bg-light py-4 mt-5">
    <Container>
      <Row>
        <Col md>
          <h6>Account</h6>
          <ul className="list-unstyled">
            <li>My profile</li>
            <li>My trips</li>
            <li>Delete my account</li>
          </ul>
        </Col>
        <Col md>
          <h6>We're Stellar Horizons</h6>
          <ul className="list-unstyled">
            <li>FAQs</li>
            <li>Investor Relations</li>
          </ul>
        </Col>
        <Col md>
          <h6>Trust while buying</h6>
          <ul className="list-unstyled">
            <li>Terms and conditions</li>
            <li>Privacy policy</li>
            <li>Promotions</li>
          </ul>
        </Col>
        <Col md>
          <h6>List your property</h6>
          <ul className="list-unstyled">
            <li>Join your fleet</li>
            <li>Premium Partner</li>
          </ul>
        </Col>
      </Row>
      <hr />
      <p className="text-center text-muted small">Stellar Horizon 1999–2025. All rights reserved.</p>
    </Container>
  </footer>
);
