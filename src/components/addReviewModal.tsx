import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddReviewModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export const AddReviewModal = ({ show, onClose, onSubmit }: AddReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0 && comment.trim()) {
      onSubmit(rating, comment);
      setRating(0);
      setComment("");
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Reseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Calificación</Form.Label>
            <div style={{ fontSize: "1.5rem" }}>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  onClick={() => setRating(i + 1)}
                  style={{
                    cursor: "pointer",
                    color: i < rating ? "#ffc107" : "#e4e5e9",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu opinión..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={rating === 0 || !comment.trim()}>
          Enviar Reseña
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
