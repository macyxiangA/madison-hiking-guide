import { Button, Card } from "react-bootstrap";

function TrailVisitInfo({ trail }) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <h5>Plan Your Visit</h5>

        <div className="mb-3">
          <h6 className="mb-1">Parking</h6>
          <p className="text-muted mb-0">{trail.parkingNotes}</p>
        </div>

        <div className="mb-3">
          <h6 className="mb-1">Restrooms</h6>
          <p className="text-muted mb-0">{trail.restroomNotes}</p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Button
            as="a"
            href={trail.mapUrl}
            target="_blank"
            rel="noreferrer"
            variant="outline-success"
          >
            Official Map
          </Button>
          <Button
            as="a"
            href={trail.directionsUrl}
            target="_blank"
            rel="noreferrer"
            variant="outline-primary"
          >
            Directions
          </Button>
        </div>

        <p className="small text-muted mt-3 mb-0">
          Info source:{" "}
          <a href={trail.sourceUrl} target="_blank" rel="noreferrer">
            official visitor information
          </a>
        </p>
      </Card.Body>
    </Card>
  );
}

export default TrailVisitInfo;
