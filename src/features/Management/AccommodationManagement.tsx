import { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Toast } from 'react-bootstrap';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import * as api from '../../utils/api';
import type { Accommodation } from '../../utils/api';

export const AccommodationManagement = () => {
  const [accommodations, setAccommodations] = useState(api.getAccommodations());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Accommodation, 'id'>>({
    name: '',
    destinationId: 1,
    price: 0,
    rooms: 1,
    image: '',
    description: '',
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updated = accommodations.map(a => (a.id === editingId ? { ...a, ...formData } : a));
      setAccommodations(updated);
      showNotification('Alojamiento actualizado con éxito', 'success');
    } else {
      const newAccommodation: Accommodation = { ...formData, id: accommodations.length + 1 };
      setAccommodations([...accommodations, newAccommodation]);
      showNotification('Alojamiento creado con éxito', 'success');
    }
    resetForm();
  };

  const handleDelete = (id: number) => {
    setAccommodations(accommodations.filter(a => a.id !== id));
    showNotification('Alojamiento eliminado con éxito', 'success');
  };

  const handleEdit = (id: number) => {
    const acc = accommodations.find(a => a.id === id);
    if (acc) {
      setFormData({ ...acc });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', destinationId: 1, price: 0, rooms: 1, image: '', description: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h2>Gestionar Alojamientos</h2>
          <Button onClick={() => setShowForm(true)} className="d-flex align-items-center gap-2">
            <Plus size={18} /> <span>Nuevo Alojamiento</span>
          </Button>
        </Col>
      </Row>

      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Habitaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map(acc => (
            <tr key={acc.id}>
              <td>{acc.id}</td>
              <td>{acc.name}</td>
              <td>${acc.price}</td>
              <td>{acc.rooms}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(acc.id)}>
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(acc.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={resetForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Alojamiento' : 'Nuevo Alojamiento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Destino (ID)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.destinationId}
                    onChange={(e) => setFormData({ ...formData, destinationId: Number(e.target.value) })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Habitaciones</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: Number(e.target.value) })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Imagen (URL)</Form.Label>
                  <Form.Control
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              {editingId ? 'Actualizar' : 'Crear'} Alojamiento
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Toast
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        bg={notification.type === 'success' ? 'success' : 'danger'}
        style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
      >
        <Toast.Header>
          <strong className="me-auto">{notification.type === 'success' ? 'Éxito' : 'Error'}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{notification.message}</Toast.Body>
      </Toast>
    </Container>
  );
};