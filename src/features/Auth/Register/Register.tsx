import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../../../components/Register/RegisterForm";
import styles from "./Register.module.css";

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Crea una cuenta</h2>
        <RegisterForm onSubmit={handleRegister} />
        <Link to="/login">¿Ya tienes cuenta? Iniciar Sesión</Link>
      </div>
    </div>
  );
};
