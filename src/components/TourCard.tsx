import { Card } from "react-bootstrap";
import type { Tour } from "../utils/api";

interface Props {
  tour: Tour;
}

export const TourCard = ({ tour }: Props) => (
  <Card
    style={{
      width: "300px",
      height: "400px",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
    className="hover-lift"
  >
    <Card.Img
      variant="top"
      src={`/images/${tour.image}`}
      alt={tour.name}
      style={{ height: "180px", objectFit: "cover" }}
    />
    <Card.Body
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <div>
        <Card.Title>{tour.name}</Card.Title>
        <Card.Text
          style={{
            fontSize: "0.9rem",
          }}
        >
          {tour.description}
        </Card.Text>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <small>Duration: {tour.duration}</small>
        <br />
        <strong>${tour.price}</strong>
      </div>
    </Card.Body>
  </Card>
);
