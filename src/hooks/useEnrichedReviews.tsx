import { useEffect, useState } from "react";
import {
  getBookings,
  getReviews,
  getUserById,
  //getTourById,
} from "../utils/api";

export interface EnrichedReview {
  id: number;
  rating: number;
  comment: string;
  date: string;
  userName: string;
}

export const useEnrichedReviews = (): EnrichedReview[] => {
  const [enrichedReviews, setEnrichedReviews] = useState<EnrichedReview[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const reviews = await getReviews();
      const bookings = await getBookings();

      const enriched = await Promise.all(
        reviews.map(async (review) => {
          const booking = bookings.find((b) => b.id === review.bookingId);
          const user = booking ? await getUserById(booking.userId) : undefined;
          //const tour = booking ?.tourId ? await getTourById(booking.tourId) : null;

          return {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            date: review.date,
            userName: user?.name ?? "Anónimo",
          };
        })
      );

      setEnrichedReviews(enriched);
    };

    loadData();
  }, []);

  return enrichedReviews;
};
