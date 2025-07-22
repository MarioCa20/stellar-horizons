import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, Toast, Spinner } from 'react-bootstrap';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import * as api from '../../utils/api';
import type { Tour } from '../../utils/api';

export const TourManagement = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Tour, 'id'>>({
    name: '',
    description: '',
    duration: '',
    price: 0,
    image: '', // Guardará la URL o el nombre del archivo
    availableSpots: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    api.getTours().then((data: Tour[]) => {
      // Mapea los tours para usar availableSpots en vez de available_spots
      const mappedTours = data.map(tour => ({
        ...tour,
        availableSpots: tour.available_spots ?? tour.availableSpots,
      }));
      setTours(mappedTours);
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
        description: formData.description,
        duration: `${formData.duration} días`, // Duración como "X días"
        price: formData.price,
        available_spots: formData.availableSpots,
        image: imageFile || undefined, // Solo envía si hay nueva imagen
      };
      let createdOrUpdated;
      if (editingId) {
        createdOrUpdated = await api.updateTour(editingId, payload);
        setTours(ts => ts.map(t => t.id === editingId ? createdOrUpdated : t));
        showNotification('Tour actualizado con éxito', 'success');
      } else {
        createdOrUpdated = await api.createTour(payload);
        setTours(ts => [...ts, createdOrUpdated]);
        showNotification('Tour creado con éxito', 'success');
      }
      resetForm();
    } catch (err) {
      // Si el error es una respuesta HTTP, intenta extraer los errores
      if (err instanceof Response) {
        err.json().then((errorData: Record<string, string[]>) => {
          setFormErrors(errorData);
        });
      } else if (err instanceof Error && err.message) {
        setFormErrors({ general: [err.message] });
      } else {
        setFormErrors({ general: ['Error desconocido'] });
      }
      showNotification('Error al guardar tour', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteTour(id);
      setTours(ts => ts.filter(t => t.id !== id));
      showNotification('Tour eliminado con éxito', 'success');
    } catch {
      showNotification('Error al eliminar tour', 'error');
    }
  };

  const handleEdit = (id: number) => {
    const tour = tours.find(t => t.id === id);
    if (tour) {
      const { id, ...rest } = tour;
      // Extrae cantidad de días del string duración
      const dias = rest.duration.match(/(\d+)/)?.[0] || '';
      setFormData({
        ...rest,
        duration: dias,
        availableSpots: rest.availableSpots ?? rest.available_spots,
        image: rest.image || '',
      });
      setImagePreview(rest.image && rest.image.startsWith('http') ? rest.image : `/public/images/${rest.image}`);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', duration: '', price: 0, image: '', availableSpots: 1 });
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
          <h2>Gestionar Tours</h2>
          <Button onClick={() => setShowForm(true)} className="d-flex align-items-center gap-2">
            <Plus size={18} /> <span>Nuevo Tour</span>
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
      )}
      <Modal show={showForm} onHide={resetForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Tour' : 'Nuevo Tour'}</Modal.Title>
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
                  <Form.Label>Duración</Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control
                      type="number"
                      min={1}
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                      style={{ width: '80px' }}
                    />
                    <span>días</span>
                  </div>
                  {formErrors.duration && (
                    <div className="text-danger small">{formErrors.duration.join(', ')}</div>
                  )}
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
                  {formErrors.price && (
                    <div className="text-danger small">{formErrors.price.join(', ')}</div>
                  )}
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
                  {formErrors.available_spots && (
                    <div className="text-danger small">{formErrors.available_spots.join(', ')}</div>
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