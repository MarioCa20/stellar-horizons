import { useMemo } from "react";
import {
  getBookings,
  getReviews,
  getUserById,
  getTourById,
} from "../utils/api";

export interface EnrichedReview {
  id: number;
  rating: number;
  comment: string;
  date: string;
  userName: string;
  tourName: string | null;
}

export const useEnrichedReviews = (): EnrichedReview[] => {
  const reviews = getReviews();
  const bookings = getBookings();

  const enrichedReviews = useMemo(() => {
    return reviews.map((review) => {
      const booking = bookings.find((b) => b.id === review.bookingId);
      const user = booking ? getUserById(booking.userId) : undefined;
      const tour = booking?.tourId ? getTourById(booking.tourId) : null;

      return {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        date: review.date,
        userName: user?.name ?? "Anónimo",
        tourName: tour?.name ?? "Alojamiento",
      };
    });
  }, [reviews, bookings]);

  return enrichedReviews;
};
