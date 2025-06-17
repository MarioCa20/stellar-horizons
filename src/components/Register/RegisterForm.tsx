import React, { useState, useEffect } from "react";
import styles from "./RegisterForm.module.css";
import { Button, Form } from "react-bootstrap";

type FormProps = {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
};

export const RegisterForm = ({ onSubmit }: FormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  useEffect(() => {
    if (password && password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else {
      setPasswordError("");
    }

    if (password2 && password !== password2) {
      setPasswordMatchError("Las contraseñas no coinciden.");
    } else {
      setPasswordMatchError("");
    }
  }, [password, password2]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordError && !passwordMatchError) {
      onSubmit({ name, email, password });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Form.Group>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nombre"
          required
        />
      </Form.Group>

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
          isInvalid={!!passwordError}
        />
        <Form.Control.Feedback type="invalid">
          {passwordError}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Control
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          placeholder="Confirmar contraseña"
          required
          isInvalid={!!passwordMatchError}
        />
        <Form.Control.Feedback type="invalid">
          {passwordMatchError}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="secondary"
        type="submit"
        disabled={!!passwordError || !!passwordMatchError}
      >
        Registrarse
      </Button>
    </Form>
  );
};
