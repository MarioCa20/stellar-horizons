import mockData from "../data/mock_data.json";
import type { AccommodationFormData } from "./validations/accommodation";

// URL base de la API
export const API_BASE_URL = "http://127.0.0.1:8000/api/v1/";
export const API_AUTH_BASE_URL = "http://127.0.0.1:8000/api-auth/";

// Types for our data structures
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Planet {
  id: number;
  name: string;
  population: string;
  language: string;
  currency: string;
  image: string;
}

export interface Activity {
  id: number;
  name: string;
  type: string;
  description: string;
}

export interface Destination {
  id: number;
  name: string;
  planetId: number;
  activityId: number;
  description: string;
  image: string;
}

export interface Accommodation {
  id: number;
  name: string;
  destination: number;
  price: string;
  rooms: number;
  image: string;
  description: string;
}

export interface Tour {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: number;
  availableSpots: number;
  image: string;
}

export interface Booking {
  id: number;
  userId: number;
  tourId: number | null;
  accommodationId: number | null;
  date: string;
  people: number;
  paymentMethod: string;
  status: string;
}

export interface Review {
  id: number;
  bookingId: number;
  rating: number;
  comment: string;
  date: string;
}

export interface TourDestination {
  id: number;
  tourId: number;
  destinationId: number;
  visitDate: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface UserCredentials {
  nit: string;
  name: string;
  email: string;
  password: string;
}

export interface CreatedUserResponse {
  id: number;
  email: string;
  name: string;
  nit: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
}

/**
 * Mock API Service
 *
 * DEVELOPER NOTE: If you need to get specific data or add new methods,
 * please add them here following the same pattern.
 * Example: getBookingsByUserId, getToursByDestination, etc.
 */

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_AUTH_BASE_URL}login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al iniciar sesión');
  }

  return response.json();
};

export const createUser = async (credentials: UserCredentials): Promise<CreatedUserResponse> => {
  const response = await fetch(`${API_BASE_URL}users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "No se pudo crear el usuario.");
  }

  const data = await response.json();
  return data as CreatedUserResponse;
};

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_BASE_URL}users/`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};

export const getReviews = async (): Promise<Review[]> => {
  const res = await fetch(`${API_BASE_URL}reviews/`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  const res = await fetch(`${API_BASE_URL}users/${id}/`);
  if (!res.ok) return undefined;
  const data = await res.json();
  return data;
};

export const getPlanets = async (): Promise<Planet[]> => {
  const res = await fetch(`${API_BASE_URL}planets/`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};
export const getPlanetById = async (id: number): Promise<Planet | undefined> => {
  const res = await fetch(`${API_BASE_URL}planets/${id}/`);
  if (!res.ok) return undefined;
  const data = await res.json();
  return data;
};
export const getActivities = async (): Promise<Activity[]> => {
  const res = await fetch(`${API_BASE_URL}activities/`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};
export const getActivityById = async (id: number): Promise<Activity | undefined> => {
  const res = await fetch(`${API_BASE_URL}activities/${id}/`);
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.results ?? [];
};

// Complex queries

// Métodos para Tour ------------------------
export const getTours = async (): Promise<Tour[]> => {
  const res = await fetch(`${API_BASE_URL}tours/`);
  const data = await res.json();
  return data.results;
};

export const getTourById = async (id: number): Promise<Tour | undefined> => {
  const res = await fetch(`${API_BASE_URL}tours/${id}/`);
  if (!res.ok) return undefined;
  const data = await res.json();
  return data;

};

export async function getFilteredTours(params: {
  activity?: number | null;
  planet?: number | null;
  duration?: string | null;
  max_price?: number | null;
}) {
  const query = new URLSearchParams();

  if (params.activity != null) query.append("activity", params.activity.toString());
  if (params.planet != null) query.append("planet", params.planet.toString());
  if (params.duration != null) query.append("duration", params.duration);
  if (params.max_price != null) query.append("max_price", params.max_price.toString());

  const response = await fetch(`${API_BASE_URL}tours/?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Error al obtener los tours");
  }

  const data = await response.json();
  return data.results as Tour[];
}

// Métodos para Destination ------------------------
export const getDestinations = async (): Promise<Destination[]> => {
  const res = await fetch(`${API_BASE_URL}destinations/`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};

export const getDestinationById = async (id: number): Promise<Destination | undefined> => {
  const res = await fetch(`${API_BASE_URL}destinations/${id}/`);
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.results ?? [];
};

export const getDestinationsByPlanetId = async (planetId: number): Promise<Destination[]> => {
  const res = await fetch(`${API_BASE_URL}destinations/?planet=${planetId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? [];
};

// Métodos para Accommodation ------------------------
export const getAccommodations = async (): Promise<Accommodation[]> => {
  const res = await fetch(`${API_BASE_URL}accommodations/`);
  const data = await res.json();
  return data.results ?? [];
};

export const getAccommodationById = async (id: number): Promise<Accommodation | undefined> => {
  const res = await fetch(`${API_BASE_URL}accommodations/${id}/`);
  if (!res.ok) return undefined;
  const data = await res.json();
  return data;
};

export const createAccommodation = async (
  accommodation: AccommodationFormData
): Promise<Accommodation> => {
  const form = new FormData();
  form.append("name", accommodation.name);
  form.append("price", String(accommodation.price));
  form.append("rooms", String(accommodation.rooms));
  form.append("description", accommodation.description);
  form.append("destination", String(accommodation.destination));
  if (accommodation.imageFile) {
    form.append("image", accommodation.imageFile);
  }

  const res = await fetch(`${API_BASE_URL}accommodations/`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error al crear el alojamiento");
  }

  return await res.json();
};


export const updateAccommodation = async (
  id: number,
  accommodation: AccommodationFormData,
): Promise<Accommodation> => {
  const form = new FormData();
  form.append("name", accommodation.name);
  form.append("price", String(accommodation.price));
  form.append("rooms", String(accommodation.rooms));
  form.append("description", accommodation.description);
  form.append("destination", String(accommodation.destination));
  if (accommodation.imageFile) {
    form.append("image", accommodation.imageFile);
  }

  const res = await fetch(`${API_BASE_URL}accommodations/${id}/`, {
    method: "PATCH",
    body: form,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error al actualizar el alojamiento");
  }

  return await res.json();
};


export const deleteAccommodation = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}accommodations/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Error al eliminar el alojamiento");
  }
};


export async function getFilteredAccommodations(params: {
  activity?: number | null;
  planet?: number | null;
  max_price?: number | null;
}) {
  const query = new URLSearchParams();

  if (params.activity != null) query.append("activity", params.activity.toString());
  if (params.planet != null) query.append("planet", params.planet.toString());
  if (params.max_price != null) query.append("max_price", params.max_price.toString());

  const response = await fetch(`${API_BASE_URL}accommodations/?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Error al obtener los alojamientos");
  }

  const data = await response.json();
  return data.results ?? [] as Accommodation[];
}

// Métodos para Booking ------------------------
export const getBookingsByUserId = (userId: number): Booking[] =>
  mockData.bookings.filter((booking) => booking.userId === userId);

export const getReviewsByBookingId = (bookingId: number): Review | undefined =>
  mockData.reviews.find((review) => review.bookingId === bookingId);

export const getBookings = async (): Promise<Booking[]> => {
  const res = await fetch(`${API_BASE_URL}bookings/`);
  const data = await res.json();
  return data.results;
};

export const getBookingById = async (id: number): Promise<Booking | undefined> => {
  const res = await fetch(`${API_BASE_URL}bookings/${id}/`);
  if (!res.ok) return undefined;
  return await res.json();
};

export const createBooking = async (booking: Omit<Booking, "id" | "status">): Promise<Booking> => {
  const res = await fetch(`${API_BASE_URL}bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...booking,
      status: "Pendiente",
      payment_method: booking.paymentMethod,
      user: booking.userId,
      tour: booking.tourId,
      accommodation: booking.accommodationId,
    }),
  });
  return await res.json();
};

export const updateBooking = async (id: number, booking: Partial<Booking>): Promise<Booking> => {
  const res = await fetch(`${API_BASE_URL}bookings/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...booking,
      payment_method: booking.paymentMethod,
      user: booking.userId,
      tour: booking.tourId,
      accommodation: booking.accommodationId,
    }),
  });
  return await res.json();
};

export const deleteBooking = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}bookings/${id}/`, { method: "DELETE" });
};

/**
 * DEVELOPER NOTE:
 * To add new methods, follow this pattern:
 *
 * export const getSpecificData = (params) => {
 *   // Filter or transform mockData as needed
 *   return result;
 * };
 *
 * Remember to:
 * 1. Add TypeScript interfaces if needed
 * 2. Include proper error handling
 * 3. Document complex queries
 * 4. Consider adding unit tests for new methods
 */
