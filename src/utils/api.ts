import mockData from "../data/mock_data.json";

// URL base de la API
export const API_BASE_URL = "http://127.0.0.1:8000/api/v1/";

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
  destinationId: number;
  price: number;
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

export interface DestinationTour {
  id: number;
  tourId: number;
  destinationId: number;
  visitDate: string;
}

/**
 * Mock API Service
 *
 * DEVELOPER NOTE: If you need to get specific data or add new methods,
 * please add them here following the same pattern.
 * Example: getBookingsByUserId, getToursByDestination, etc.
 */

// Basic GET methods for each entity
export const getUses = (): User[] => mockData.users;
export const getPlanets = (): Planet[] => mockData.planets;
export const getActivities = (): Activity[] => mockData.activities;
export const getDestinations = (): Destination[] => mockData.destinations;
export const getReviews = (): Review[] => mockData.reviews;

// GET by ID methods
export const getUserById = (id: number): User | undefined =>
  mockData.users.find((user) => user.id === id);

export const getDestinationById = (id: number): Destination | undefined =>
  mockData.destinations.find((dest) => dest.id === id);

// Complex queries
export const getBookingsByUserId = (userId: number): Booking[] =>
  mockData.bookings.filter((booking) => booking.userId === userId);

export const getToursByActivityId = (activityId: number): Tour[] => {
  // 1. Encuentra destinos con esa actividad
  const destinationIds = mockData.destinations
    .filter((dest) => dest.activityId === activityId)
    .map((dest) => dest.id);

  // 2. Encuentra relaciones tour-destino con esos destinos
  const tourIds = mockData.tour_destinations
    .filter((dt) => destinationIds.includes(dt.destinationId))
    .map((dt) => dt.tourId);

  // 3. Elimina duplicados
  const uniqueTourIds = Array.from(new Set(tourIds));

  // 4. Devuelve los tours que coinciden
  return mockData.tours.filter((tour) => uniqueTourIds.includes(tour.id));
};

export const getReviewsByBookingId = (bookingId: number): Review | undefined =>
  mockData.reviews.find((review) => review.bookingId === bookingId);

export const getDestinationsByPlanetId = (planetId: number): Destination[] =>
  mockData.destinations.filter((dest) => dest.planetId === planetId);

export const getAccommodationsByDestinationId = (
  destinationId: number
): Accommodation[] =>
  mockData.accommodations.filter((acc) => acc.destinationId === destinationId);

export const getAccommodationsByPlanetId = (
  planetId: number
): Accommodation[] => {
  const destinations = getDestinationsByPlanetId(planetId);

  // Usamos flatMap para combinar los resultados de múltiples destinos
  return destinations.flatMap((dest) =>
    getAccommodationsByDestinationId(dest.id)
  );
};

// Métodos para Booking
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

// Métodos para Tour
export const getTours = async (): Promise<Tour[]> => {
  const res = await fetch(`${API_BASE_URL}tours/`);
  const data = await res.json();
  return data.results;
};

export const getTourById = async (id: number): Promise<Tour | undefined> => {
  const res = await fetch(`${API_BASE_URL}tours/${id}/`);
  if (!res.ok) return undefined;
  return await res.json();
};

// Métodos para Accommodation
export const getAccommodations = async (): Promise<Accommodation[]> => {
  const res = await fetch(`${API_BASE_URL}accommodations/`);
  const data = await res.json();
  return data.results;
};

export const getAccommodationsById = async (id: number): Promise<Accommodation | undefined> => {
  const res = await fetch(`${API_BASE_URL}accommodations/${id}/`);
  if (!res.ok) return undefined;
  return await res.json();
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
