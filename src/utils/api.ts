import mockData from '../data/mock_data.json';

// Types for our data structures
interface User {
  id: number;
  name: string;
  email: string;
}

interface Planet {
  id: number;
  name: string;
  population: string;
  language: string;
  currency: string;
  image: string;
}

interface Activity {
  id: number;
  name: string;
  type: string;
  description: string;
}

interface Destination {
  id: number;
  name: string;
  planetId: number;
  activityId: number;
  description: string;
  image: string;
}

interface Accommodation {
  id: number;
  name: string;
  destinationId: number;
  price: number;
  rooms: number;
  image: string;
  description: string;
}

interface Tour {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: number;
  availableSpots: number;
}

interface Booking {
  id: number;
  userId: number;
  tourId: number | null;
  accommodationId: number | null;
  date: string;
  people: number;
  paymentMethod: string;
  status: string;
}

interface Review {
  id: number;
  bookingId: number;
  rating: number;
  comment: string;
  date: string;
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
  mockData.users.find(user => user.id === id);

export const getDestinationById = (id: number): Destination | undefined => 
  mockData.destinations.find(dest => dest.id === id);

export const getTourById = (id: number): Tour | undefined => 
  mockData.tours.find(tour => tour.id === id);

// Complex queries
export const getBookingsByUserId = (userId: number): Booking[] =>
  mockData.bookings.filter(booking => booking.userId === userId);

export const getReviewsByBookingId = (bookingId: number): Review | undefined =>
  mockData.reviews.find(review => review.bookingId === bookingId);

export const getDestinationsByPlanetId = (planetId: number): Destination[] =>
  mockData.destinations.filter(dest => dest.planetId === planetId);

export const getAccommodationsByDestinationId = (destinationId: number): Accommodation[] =>
  mockData.accommodations.filter(acc => acc.destinationId === destinationId);

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
