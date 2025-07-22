import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Toast, Spinner } from 'react-bootstrap';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import * as api from '../../utils/api';
import type { Accommodation } from '../../utils/api';

export const AccommodationManagement = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [destinations, setDestinations] = useState<api.Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Accommodation, 'id'>>({
    name: '',
    destinationId: 0,
    price: 0,
    rooms: 1,
    image: '',
    description: '',
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api.getAccommodations(),
      api.getDestinations()
    ]).then(([accommodationData, destinationData]) => {
      setAccommodations(accommodationData);
      setDestinations(destinationData);
      setLoading(false);
    });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file.name });
    } else {
      setImagePreview(null);
      setFormData({ ...formData, image: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    try {
      const payload = {
        name: formData.name,
        destination: formData.destinationId,
        price: formData.price,
        rooms: formData.rooms,
        image: imageFile || undefined, // Solo envía si hay nueva imagen
        description: formData.description,
      };
      let createdOrUpdated;
      if (editingId) {
        createdOrUpdated = await api.updateAccommodation(editingId, payload);
        setAccommodations(accs => accs.map(a => a.id === editingId ? createdOrUpdated : a));
        showNotification('Alojamiento actualizado con éxito', 'success');
      } else {
        createdOrUpdated = await api.createAccommodation(payload);
        setAccommodations(accs => [...accs, createdOrUpdated]);
        showNotification('Alojamiento creado con éxito', 'success');
      }
      resetForm();
    } catch (err) {
      if (err instanceof Response) {
        err.json().then((errorData: Record<string, string[]>) => {
          setFormErrors(errorData);
        });
      } else if (err instanceof Error && err.message) {
        setFormErrors({ general: [err.message] });
      } else {
        setFormErrors({ general: ['Error desconocido'] });
      }
      showNotification('Error al guardar alojamiento', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteAccommodation(id);
      setAccommodations(accs => accs.filter(a => a.id !== id));
      showNotification('Alojamiento eliminado con éxito', 'success');
    } catch {
      showNotification('Error al eliminar alojamiento', 'error');
    }
  };

  const handleEdit = (id: number) => {
    const acc = accommodations.find(a => a.id === id);
    if (acc) {
      const { id, ...rest } = acc;
      setFormData({ ...rest, image: rest.image || '' });
      setImagePreview(rest.image && rest.image.startsWith('http') ? rest.image : `/public/images/${rest.image}`);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', destinationId: destinations[0]?.id ?? 0, price: 0, rooms: 1, image: '', description: '' });
    setImageFile(null);
    setImagePreview(null);
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
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Destino</th>
            <th>Precio</th>
            <th>Habitaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map(acc => {
            const dest = destinations.find(d => d.id === acc.destinationId || d.id === acc.destination);
            return (
              <tr key={acc.id}>
                <td>{acc.id}</td>
                <td>{acc.name}</td>
                <td>{dest ? dest.name : acc.destinationId ?? acc.destination}</td>
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
            );
          })}
        </tbody>
      </Table>
      )}
      <Modal show={showForm} onHide={resetForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Alojamiento' : 'Nuevo Alojamiento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formErrors.general && (
            <div className="alert alert-danger mb-3">
              {formErrors.general.join(', ')}
            </div>
          )}
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
                  {formErrors.name && (
                    <div className="text-danger small">{formErrors.name.join(', ')}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Destino</Form.Label>
                  <Form.Select
                    value={formData.destinationId}
                    onChange={e => setFormData({ ...formData, destinationId: Number(e.target.value) })}
                    required
                  >
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.id}>{dest.name}</option>
                    ))}
                  </Form.Select>
                  {formErrors.destination && (
                    <div className="text-danger small">{formErrors.destination.join(', ')}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value));
                      setFormData({ ...formData, price: value });
                    }}
                    required
                  />
                  {formErrors.price && (
                    <div className="text-danger small">{formErrors.price.join(', ')}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Habitaciones</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    value={formData.rooms}
                    onChange={(e) => {
                      const value = Math.max(1, Number(e.target.value));
                      setFormData({ ...formData, rooms: value });
                    }}
                    required
                  />
                  {formErrors.rooms && (
                    <div className="text-danger small">{formErrors.rooms.join(', ')}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {(imagePreview || (formData.image && !imageFile)) && (
                    <div className="mt-2">
                      <img
                        src={
                          imagePreview ||
                          (formData.image.startsWith('http')
                            ? formData.image
                            : `/public/images/${formData.image}`)
                        }
                        alt="Preview"
                        style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '8px', border: '1px solid #ddd' }}
                      />
                    </div>
                  )}
                  {formErrors.image && (
                    <div className="text-danger small">{formErrors.image.join(', ')}</div>
                  )}
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
                    required
                  />
                  {formErrors.description && (
                    <div className="text-danger small">{formErrors.description.join(', ')}</div>
                  )}
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