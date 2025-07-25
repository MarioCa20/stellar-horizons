import { BedDouble, Calendar, Home, Info, LogIn, LogOut, Plane, Users, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar as BsNavbar, Container, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks/useStore";
import { logout } from "../../redux/states/authSlice";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const isAuth = useAuth();
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setExpanded(false); // Cierra el menú al cambiar de ruta
  }, [location]);

  const handleLogout = () => {
    dispatch(logout())
    window.location.reload();
  };

  return (
    <BsNavbar
      bg="dark"
      variant="dark"
      fixed="top"
      expand="md"
      className={`navbar-space ${styles.navbar}`}
      expanded={expanded}
    >
      <Container fluid>
        <BsNavbar.Brand
          as={NavLink}
          to="/"
          className="d-flex align-items-center gap-2"
          onClick={() => setExpanded(false)}
        >
          <Home size={24} />
          Stellar Horizons
        </BsNavbar.Brand>
        <BsNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded((prev) => !prev)}
        />
        <BsNavbar.Collapse
          id="basic-navbar-nav"
          className="bg-dark w-100"
        >
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/about"
              className="d-flex align-items-center gap-2 py-2 px-3"
              onClick={() => setExpanded(false)}
            >
              <Info size={18} />
              <span>Nosotros</span>
            </Nav.Link>
            <Nav.Link
                  as={NavLink}
                  to="/accommodations/all"
                  className="d-flex align-items-center gap-2 py-2 px-3"
                  onClick={() => setExpanded(false)}
                >
                  <BedDouble size={18} />
                  <span>Alojamientos</span>
                </Nav.Link>
             <Nav.Link
                  as={NavLink}
                  to="/tours/all"
                  className="d-flex align-items-center gap-2 py-2 px-3"
                  onClick={() => setExpanded(false)}
                >
                  <Plane size={18} />
                  <span>Tours</span>
                </Nav.Link>

            {isAuth && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/bookings"
                  className="d-flex align-items-center gap-2 py-2 px-3"
                  onClick={() => setExpanded(false)}
                >
                  <Calendar size={18} />
                  <span>Reservas</span>
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/management/accommodations"
                  className={`d-flex align-items-center gap-2 py-2 px-3 ${styles.adminTab}`}
                  onClick={() => setExpanded(false)}
                >
                  <Edit size={18} />
                  <span>
                    Gestión Alojamientos
                  </span>
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/management/tours"
                  className={`d-flex align-items-center gap-2 py-2 px-3 ${styles.adminTab}`}
                  onClick={() => setExpanded(false)}
                >
                  <Edit size={18} />
                  <span>
                    Gestión Tours
                  </span>
                </Nav.Link>
                <Nav.Link
                  onClick={handleLogout}
                  className="d-flex align-items-center gap-2 py-2 px-3"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </Nav.Link>
              </>
            )}

            {!isAuth && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="d-flex align-items-center gap-2 py-2 px-3"
                  onClick={() => setExpanded(false)}
                >
                  <LogIn size={18} />
                  <span>Iniciar Sesión</span>
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/register"
                  className="d-flex align-items-center gap-2 py-2 px-3"
                  onClick={() => setExpanded(false)}
                >
                  <Users size={18} />
                  <span>Registrarse</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};
