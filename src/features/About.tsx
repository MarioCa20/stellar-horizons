import { Container, Card } from "react-bootstrap";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer";

export const About = () => {
  return (
    <>
      <Navbar />
      <Container className="my-5 d-flex justify-content-center">
        <Card className="text-center shadow-lg p-4" style={{ maxWidth: "800px", width: "100%" }}>
          <Card.Body>
            <h1 className="resultado">¿Quiénes Somos?</h1>
            <p className="lead">
              <h3>Equipo 3</h3>
            </p>

            <h3 className="mt-5 text-secondary">Integrantes</h3>
            <ul className="list-unstyled mt-3">
              <li className="fs-5"> <strong>Alejandro Agudelo Anaya</strong></li>
              <li className="fs-5"> <strong>Brando Yesid Montoya Jaramillo</strong></li>
              <li className="fs-5"> <strong>Juan José Monsalve Patiño</strong></li>
              <li className="fs-5"> <strong>Fabián Andrés Chiran Guevara</strong></li>
              <li className="fs-5"> <strong>Mario Alberto Cañas Baquero</strong></li>
            </ul>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};