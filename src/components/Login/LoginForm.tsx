import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { Button, Form } from "react-bootstrap";

type FormProps = {
  onSubmit: (data: { email: string; password: string }) => void;
  loading?: boolean;
};

export const LoginForm = ({ onSubmit, loading = false }: FormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Form.Group>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Correo"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Contraseña"
          required
        />
      </Form.Group>

      <Button variant="secondary" type="submit">
        {loading ? "Cargando..." : "Ingresar"}
      </Button>
    </Form>
  );
};
