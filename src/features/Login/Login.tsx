import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../components/Login/LoginForm";
import styles from "./Login.module.css";
import { persistLocalStorage } from "../../utils/localStorage.utility";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    persistLocalStorage("auth", true);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Iniciar Sesión</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </>
  );
};
