import { Card, ListGroup } from "react-bootstrap";

function StatsPanel({ trails, likedIds }) {
  const total = trails.length;
  const easy = trails.filter(t => t.difficulty === "Easy").length;
  const medium = trails.filter(t => t.difficulty === "Medium").length;
  const hard = trails.filter(t => t.difficulty === "Hard").length;

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Trail Stats</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Total trails: {total}</ListGroup.Item>
          <ListGroup.Item>Easy: {easy}</ListGroup.Item>
          <ListGroup.Item>Medium: {medium}</ListGroup.Item>
          <ListGroup.Item>Hard: {hard}</ListGroup.Item>
          <ListGroup.Item>Saved by you: {likedIds.length}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default StatsPanel;
