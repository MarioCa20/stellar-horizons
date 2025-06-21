import { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Toast } from 'react-bootstrap';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import * as api from '../../utils/api';
import type { Tour } from '../../utils/api';

export const TourManagement = () => {
  const [tours, setTours] = useState(api.getTours());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Tour, 'id'>>({
    name: '',
    description: '',
    duration: '',
    price: 0,
    image: '',
    availableSpots: 1,
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updated = tours.map(t => (t.id === editingId ? { ...t, ...formData } : t));
      setTours(updated);
      showNotification('Tour actualizado con éxito', 'success');
    } else {
      const newTour: Tour = { ...formData, id: tours.length + 1 };
      setTours([...tours, newTour]);
      showNotification('Tour creado con éxito', 'success');
    }
    resetForm();
  };

  const handleDelete = (id: number) => {
    setTours(tours.filter(t => t.id !== id));
    showNotification('Tour eliminado con éxito', 'success');
  };

  const handleEdit = (id: number) => {
    const tour = tours.find(t => t.id === id);
    if (tour) {
      setFormData({ ...tour });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', duration: '', price: 0, image: '', availableSpots: 1 });
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
          <h2>Gestionar Tours</h2>
          <Button onClick={() => setShowForm(true)} className="d-flex align-items-center gap-2">
            <Plus size={18} /> <span>Nuevo Tour</span>
          </Button>
        </Col>
      </Row>

      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Duración</th>
            <th>Precio</th>
            <th>Spots</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tours.map(tour => (
            <tr key={tour.id}>
              <td>{tour.id}</td>
              <td>{tour.name}</td>
              <td>{tour.duration}</td>
              <td>${tour.price}</td>
              <td>{tour.availableSpots}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(tour.id)}>
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(tour.id)}>
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
          <Modal.Title>{editingId ? 'Editar Tour' : 'Nuevo Tour'}</Modal.Title>
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
                  <Form.Label>Duración</Form.Label>
                  <Form.Control
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
                  <Form.Label>Cupos disponibles</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.availableSpots}
                    onChange={(e) => setFormData({ ...formData, availableSpots: Number(e.target.value) })}
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
            </Row>
            <Button variant="primary" type="submit">
              {editingId ? 'Actualizar' : 'Crear'} Tour
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