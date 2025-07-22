import { Card } from "react-bootstrap";

interface ReviewCardProps {
  review: {
    rating: number;
    comment: string;
    date: string;
    userName: string;
    //tourName: string | null;
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className="mb-3 shadow-sm h-100">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <strong>{review.userName}</strong>
          <small className="text-muted">{}</small>
        </Card.Title>

        <div className="mb-2 text-warning" style={{ fontSize: "1.2rem" }}>
          {Array.from({ length: 5 }, (_, i) =>
            i < review.rating ? "★" : "☆"
          ).join("")}
        </div>

        <Card.Text className="fst-italic">“{review.comment}”</Card.Text>

        <div className="text-end">
          <small className="text-muted">
            {new Date(review.date).toLocaleDateString()}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};
