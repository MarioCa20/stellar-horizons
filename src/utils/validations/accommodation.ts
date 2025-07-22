export interface AccommodationFormData {
  name: string;
  price: string;
  rooms: number;
  imageFile: File | null;
  description: string;
  destination: number;
}

export const validateAccommodationForm = (data: AccommodationFormData) => {
  const errors: Partial<Record<keyof AccommodationFormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  const priceValue = parseFloat(data.price);
  if (isNaN(priceValue) || priceValue <= 0) {
    errors.price = "El precio debe ser un número mayor a 0";
  }

  if (!Number.isInteger(data.rooms) || data.rooms < 1) {
    errors.rooms = "Debe tener al menos 1 habitación";
  }

  if (!data.imageFile) {
  errors.imageFile = "Debe subir una imagen";
}

  if (!data.description.trim()) {
    errors.description = "La descripción es obligatoria";
  }

  if (!data.destination || data.destination < 1) {
    errors.destination = "Debe seleccionar un destino válido";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
