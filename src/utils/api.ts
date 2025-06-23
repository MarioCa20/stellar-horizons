import mockData from "../data/mock_data.json";

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
export const getUsers = (): User[] => mockData.users;
export const getPlanets = (): Planet[] => mockData.planets;
export const getActivities = (): Activity[] => mockData.activities;
export const getDestinations = (): Destination[] => mockData.destinations;
export const getAccommodations = (): Accommodation[] => mockData.accommodations;
export const getTours = (): Tour[] => mockData.tours;
export const getBookings = (): Booking[] => mockData.bookings;
export const getReviews = (): Review[] => mockData.reviews;

// GET by ID methods
export const getUserById = (id: number): User | undefined =>
  mockData.users.find((user) => user.id === id);

export const getDestinationById = (id: number): Destination | undefined =>
  mockData.destinations.find((dest) => dest.id === id);

export const getTourById = (id: number): Tour | undefined =>
  mockData.tours.find((tour) => tour.id === id);

export const getAccommodationsById = (id: number): Accommodation | undefined =>
  mockData.accommodations.find((acc) => acc.id === id);

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
