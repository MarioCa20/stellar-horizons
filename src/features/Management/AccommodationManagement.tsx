import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Toast, Spinner, Alert } from 'react-bootstrap';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import * as api from '../../utils/api';
import type { Accommodation } from '../../utils/api';
import { validateAccommodationForm, type AccommodationFormData } from '../../utils/validations/accommodation';

export const AccommodationManagement = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [destinations, setDestinations] = useState<api.Destination[]>([]);
  const [destinationMap, setDestinationMap] = useState<Record<number, api.Destination>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<AccommodationFormData>({
    name: '',
    destination: 1,
    price: '0',
    rooms: 1,
    description: '',
    imageFile: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AccommodationFormData, string>>>({});
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const loadAccommodations = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const accData = await api.getAccommodations();
      const accommodations = Array.isArray(accData) ? accData : [];
      setAccommodations(accommodations);

      const uniqueDestinationIds = [...new Set(accommodations.map(acc => acc.destination))];
      const destinationEntries: [number, api.Destination][] = [];

      for (const id of uniqueDestinationIds) {
        const dest = await api.getDestinationById(id);
        if (dest) {
          destinationEntries.push([id, dest]);
        }
      }

      setDestinationMap(Object.fromEntries(destinationEntries));
      setDestinations(destinationEntries.map(entry => entry[1]));
    } catch (err) {
      setApiError('No se pudieron cargar los datos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccommodations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAccommodationForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    try {
      if (editingId) {
        await api.updateAccommodation(editingId, formData);
        showNotification('Alojamiento actualizado con éxito', 'success');
      } else {
        await api.createAccommodation(formData);
        showNotification('Alojamiento creado con éxito', 'success');
      }
      resetForm();
      loadAccommodations();
    } catch (err) {
      showNotification('Error al procesar el alojamiento', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteAccommodation(id);
      showNotification('Alojamiento eliminado con éxito', 'success');
      loadAccommodations();
    } catch (err) {
      showNotification('Error al eliminar el alojamiento', 'error');
    }
  };

  const handleEdit = (id: number) => {
    const acc = accommodations.find(a => a.id === id);
    if (acc) {
      setFormData({
        name: acc.name,
        destination: acc.destination,
        price: acc.price,
        rooms: acc.rooms,
        description: acc.description,
        imageFile: null,
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', destination: 1, price: '0', rooms: 1, description: '', imageFile: null });
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
          <h2>Gestión de Alojamientos</h2>
          <Button onClick={() => setShowForm(true)} className="d-flex align-items-center gap-2">
            <Plus size={18} /> <span>Nuevo Alojamiento</span>
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" size="sm" /> Cargando datos...
        </div>
      ) : apiError ? (
        <Alert variant="danger" className="text-center">{apiError}</Alert>
      ) : (
        <Table responsive hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Habitaciones</th>
              <th>Destino</th>
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
                  {destinationMap[acc.destination]?.name || (
                    <span className="text-muted">Cargando destino...</span>
                  )}
                </td>
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
      )}

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
                    isInvalid={!!errors.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Destino</Form.Label>
                  <Form.Select
                    value={formData.destination}
                    isInvalid={!!errors.destination}
                    onChange={(e) => setFormData({ ...formData, destination: Number(e.target.value) })}
                  >
                    <option value="">Seleccionar destino</option>
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.destination}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData({ ...formData, imageFile: file });
                    }}
                  />
                  {errors.imageFile && <div className="text-danger mt-1">{errors.imageFile}</div>}
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