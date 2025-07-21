import React, { useState, useEffect } from "react";
import styles from "./RegisterForm.module.css";
import { Button, Form, Spinner } from "react-bootstrap";

type FormProps = {
  onSubmit: (data: { nit: string, name: string; email: string; password: string }) => void;
  loading?: boolean;
  error?: string | null;
};

export const RegisterForm = ({ onSubmit, loading = false }: FormProps) => {
  const [nit, setNit] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [nitError, setNitError] = useState("");
  const [emailError, setEmailError] = useState("");

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

    if (nit && (!/^\d+$/.test(nit) || parseInt(nit) <= 0)) {
      setNitError("El NIT debe ser un número positivo.");
    } else {
      setNitError("");
    }

    if (email && !email.endsWith(".com")) {
      setEmailError("El correo debe terminar en '.com'.");
    } else {
      setEmailError("");
    }
  }, [password, password2, nit, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordError && !passwordMatchError && !nitError) {
      onSubmit({ name, email, password, nit});
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Form.Group>
        <Form.Control
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          type="text"
          placeholder="Nit"
          required
          isInvalid={!!nitError}
        />
        <Form.Control.Feedback type="invalid">{nitError}</Form.Control.Feedback>
      </Form.Group>

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
          isInvalid={!!emailError}
        />
        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
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
        disabled={!!passwordError ||
          !!passwordMatchError ||
          !!nitError ||
          !!emailError ||
          loading}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Registrando...
          </>
        ) : (
          "Registrarse"
        )}
      </Button>
    </Form>
  );
};
