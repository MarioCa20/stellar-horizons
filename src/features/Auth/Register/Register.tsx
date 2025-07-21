import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "../../../components/Register/RegisterForm";
import styles from "./Register.module.css";
import { useAppDispatch } from "../../../hooks/useStore";
import { loginUser, registerUser } from "../../../redux/states/authSlice";
import { Toast } from "react-bootstrap";
import { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleRegister = async (values: { name: string; email: string; password: string; nit: string }) => {
    const registerResult = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(registerResult)) {
      showNotification('Usuario registrado correctamente', 'success');
      const loginResult = await dispatch(
        loginUser({ email: adminEmail, password: adminPassword})
      );
      if (loginUser.fulfilled.match(loginResult)) {
        navigate("/");
        window.location.reload();
      } else {
        console.error("Error al iniciar sesión automáticamente después del registro.");
      }
    } else {
      console.error("Error al registrar el usuario.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h2>Crea una cuenta</h2>
          <RegisterForm onSubmit={handleRegister} />
          <Link to="/login">¿Ya tienes cuenta? Iniciar Sesión</Link>
        </div>
      </div>

      <Toast
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        className={styles.toast}
        bg={notification.type === 'success' ? 'success' : 'danger'}
      >
        <Toast.Header>
          <strong className="me-auto">
            {notification.type === 'success' ? 'Éxito' : 'Error'}
          </strong>
        </Toast.Header>
        <Toast.Body className={notification.type === 'success' ? 'text-white' : ''}>
          {notification.message}
        </Toast.Body>
      </Toast>
    </>
  );
};
