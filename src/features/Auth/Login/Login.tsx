import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "../../../components/Login/LoginForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { loginUser } from "../../../redux/states/authSlice";
import styles from "./Login.module.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (values: { email: string; password: string }) => {
    const result = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(result)) {
        navigate("/");
        window.location.reload();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Iniciar Sesión</h2>
        <LoginForm onSubmit={handleLogin} loading={loading}/>
        {error && <p className={styles.error}>{error}</p>}
        <Link to="/register">¿No tienes cuenta? Registrarse</Link>
      </div>
    </div>
  );
};
