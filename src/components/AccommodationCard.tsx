import { Card } from "react-bootstrap";
import { type Accommodation } from "../utils/api";

interface Props {
  accommodation: Accommodation;
}

export const AccommodationCard = ({ accommodation }: Props) => (
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
      src={accommodation.image}
      alt={accommodation.name}
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
        <Card.Title>{accommodation.name}</Card.Title>
        <Card.Text style={{ fontSize: "0.9rem" }} className="line-clamp-3">
          {accommodation.description}
        </Card.Text>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <small>Rooms: {accommodation.rooms}</small>
        <br />
        <strong>${accommodation.price}</strong>
      </div>
    </Card.Body>
  </Card>
);
