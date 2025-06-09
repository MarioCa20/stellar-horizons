export interface BookingFormData {
  userId: number;
  tourId: number | null;
  accommodationId: number | null;
  date: string;
  people: number;
  paymentMethod: string;
}

export const validateBookingForm = (data: BookingFormData) => {
  const errors: Partial<Record<keyof BookingFormData, string>> = {};

  if (!data.userId) {
    errors.userId = "Por favor, seleccione un usuario";
  }

  if (!data.tourId && !data.accommodationId) {
    errors.tourId = "Debe seleccionar un tour o alojamiento";
  }

  if (!data.date) {
    errors.date = "La fecha es requerida";
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    if (selectedDate < today) {
      errors.date = "La fecha no puede ser anterior a hoy";
    }
  }

  if (!data.people || data.people < 1) {
    errors.people = "Debe incluir al menos 1 persona";
  }

  if (!data.paymentMethod) {
    errors.paymentMethod = "Seleccione un método de pago";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
