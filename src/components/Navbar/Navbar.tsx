import { Nav, Navbar as BsNavbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Map, Info, LogIn, User, Magnet} from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <BsNavbar bg="dark" variant="dark" fixed="top" expand="md" className={styles.navbar}>
      <Container fluid>
        <BsNavbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
          <Home size={24} />
          Stellar Horizons
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/bookings" className="d-flex align-items-center gap-2">
              <Calendar size={18} />
              <span>Reservas</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/destinations" className="d-flex align-items-center gap-2">
              <Map size={18} />
              <span>Destinos</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="d-flex align-items-center gap-2">
              <LogIn size={18} />
              <span>Iniciar Sesion</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className="d-flex align-items-center gap-2">
              <User size={18} />
              <span>Registrarse</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="d-flex align-items-center gap-2">
              <Info size={18} />
              <span>Nosotros</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Management/accommodations" className="d-flex align-items-center gap-2">
              <Magnet size={18} />
              <span>Alojamientos</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Management/tours" className="d-flex align-items-center gap-2">
              <Magnet size={18} />
              <span>Tours</span>
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};
