import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Toast, Modal } from 'react-bootstrap';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import * as api from '../../utils/api';
import { validateBookingForm } from '../../utils/validations/bookings';
import type { BookingFormData } from '../../utils/validations/bookings';
import styles from './Booking.module.css';
import { useLocation } from 'react-router-dom';

type FormErrors = Partial<Record<keyof BookingFormData, string>>;

export const Booking = () => {
  const [bookings, setBookings] = useState(api.getBookings());
  const [tours] = useState(api.getTours());
  const [accommodations] = useState(api.getAccommodations());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState<BookingFormData>({
    userId: 1, // Default user for mock
    tourId: null,
    accommodationId: null,
    date: '',
    people: 1,
    paymentMethod: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [bookingType, setBookingType] = useState<'tour' | 'accommodation' | ''>('');
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state.tourId) {
        setBookingType('tour');
        setFormData((prev) => ({
          ...prev,
          tourId: location.state.tourId,
          accommodationId: null,
        }));
        setShowForm(true);
      } else if (location.state.accommodationId) {
        setBookingType('accommodation');
        setFormData((prev) => ({
          ...prev,
          tourId: null,
          accommodationId: location.state.accommodationId,
        }));
        setShowForm(true);
      }
    }
    // eslint-disable-next-line
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingId) {
      // Update existing booking
      const updatedBookings = bookings.map(booking =>
        booking.id === editingId
          ? { ...booking, ...formData, status: 'Confirmado' }
          : booking
      );
      setBookings(updatedBookings);
      showNotification('Reserva actualizada con éxito', 'success');
    } else {
      // Create new booking
      const newBooking = {
        ...formData,
        id: bookings.length + 1,
        status: 'Pendiente',
      };
      setBookings([...bookings, newBooking]);
      showNotification('Reserva creada con éxito', 'success');
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    showNotification('Reserva eliminada con éxito', 'success');
  };

  const handleEdit = (id: number) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      setFormData({
        userId: booking.userId,
        tourId: booking.tourId,
        accommodationId: booking.accommodationId,
        date: booking.date,
        people: booking.people,
        paymentMethod: booking.paymentMethod,
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: 1,
      tourId: null,
      accommodationId: null,
      date: '',
      people: 1,
      paymentMethod: '',
    });
    setEditingId(null);
    setShowForm(false);
    setErrors({});
    setBookingType('');
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleClose = () => {
    setShowForm(false);
    resetForm();
  };

  const handleBookingTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as 'tour' | 'accommodation' | '';
    setBookingType(type);
    setFormData({
      ...formData,
      tourId: null,
      accommodationId: null
    });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setFormData({
      ...formData,
      tourId: bookingType === 'tour' ? value : null,
      accommodationId: bookingType === 'accommodation' ? value : null
    });
  };

  return (
    <Container fluid className={styles.bookingContainer}>
      <Row className="mb-4">
        <Col xs={12} className="d-flex justify-content-between align-items-center">
          <h2 className="pt-4">Gestión de Reservas</h2>
          <Button 
            variant="primary" 
            onClick={() => setShowForm(true)}
            className="d-flex align-items-center gap-2"
          >
            <Plus size={18} />
            <span className="d-none d-sm-inline">Nueva Reserva</span>
          </Button>
        </Col>
      </Row>

      <div className={styles.tableResponsive}>
        <Table responsive hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tour/Alojamiento</th>
              <th className="d-none d-md-table-cell">Fecha</th>
              <th className="d-none d-sm-table-cell">Personas</th>
              <th className="d-none d-lg-table-cell">Método de Pago</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>
                  {booking.tourId 
                    ? tours.find(t => t.id === booking.tourId)?.name
                    : accommodations.find(a => a.id === booking.accommodationId)?.name}
                </td>
                <td className="d-none d-md-table-cell">{booking.date}</td>
                <td className="d-none d-sm-table-cell">{booking.people}</td>
                <td className="d-none d-lg-table-cell">{booking.paymentMethod}</td>
                <td>{booking.status}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleEdit(booking.id)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(booking.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showForm} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Reserva' : 'Nueva Reserva'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Tipo de Reserva</Form.Label>
                  <Form.Select
                    value={bookingType}
                    onChange={handleBookingTypeChange}
                    isInvalid={!!errors.tourId}
                  >
                    <option value="">Seleccionar tipo de reserva</option>
                    <option value="tour">Tour</option>
                    <option value="accommodation">Alojamiento</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tourId}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {bookingType && (
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>{bookingType === 'tour' ? 'Tour' : 'Alojamiento'}</Form.Label>
                    <Form.Select
                      value={bookingType === 'tour' ? formData.tourId || '' : formData.accommodationId || ''}
                      onChange={handleOptionChange}
                      isInvalid={bookingType === 'tour' && !!errors.tourId}
                    >
                      <option value="">
                        Seleccionar {bookingType === 'tour' ? 'tour' : 'alojamiento'}
                      </option>
                      {bookingType === 'tour' ? (
                        tours.map(tour => (
                          <option key={tour.id} value={tour.id}>
                            {tour.name} - {tour.duration} - ${tour.price}
                          </option>
                        ))
                      ) : (
                        accommodations.map(acc => (
                          <option key={acc.id} value={acc.id}>
                            {acc.name} - ${acc.price}/noche
                          </option>
                        ))
                      )}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.tourId}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    isInvalid={!!errors.date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Número de Personas</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={formData.people}
                    onChange={(e) => setFormData({...formData, people: Number(e.target.value)})}
                    isInvalid={!!errors.people}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.people}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Método de Pago</Form.Label>
                  <Form.Select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    isInvalid={!!errors.paymentMethod}
                  >
                    <option value="">Seleccionar método de pago</option>
                    <option value="Crédito Estelar">Crédito Estelar</option>
                    <option value="Cristales">Cristales</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.paymentMethod}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingId ? 'Actualizar' : 'Crear'} Reserva
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        className={styles.toast}
        bg={notification.type === 'success' ? 'success' : 'danger'}
      >
        <Toast.Header>
          <strong className="me-auto">
            {notification.type === 'success' ? 'Éxito' : 'Error'}
          </strong>
        </Toast.Header>
        <Toast.Body className={notification.type === 'success' ? 'text-white' : ''}>
          {notification.message}
        </Toast.Body>
      </Toast>
    </Container>
  );
};
