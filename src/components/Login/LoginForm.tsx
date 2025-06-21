import React, { useState } from "react";
import styles from "./LoginForm.module.css";

type FormProps = {
  onSubmit: (data: { email: string; password: string }) => void;
};

export const LoginForm = ({ onSubmit }: FormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          required
        />
      </div>
      <div>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
      </div>
      <button className="btn btn-secondary" type="submit">
        Ingresar
      </button>
    </form>
  );
};
