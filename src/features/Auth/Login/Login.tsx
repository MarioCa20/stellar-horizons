import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../../components/Login/LoginForm";
import { persistLocalStorage } from "../../../utils/localStorage.utility";
import styles from "./Login.module.css";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    persistLocalStorage("auth", true);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Iniciar Sesión</h2>
        <LoginForm onSubmit={handleLogin} />
        <Link to="/register">¿No tienes cuenta? Registrarse</Link>
      </div>
    </div>
  );
};
