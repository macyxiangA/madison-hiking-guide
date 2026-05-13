import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TrailCardWide({ trail, onUnlike }) {
  return (
    <Card className="w-100 shadow-sm">
      <Row className="g-0 align-items-center">
        <Col md={4}>
          <Card.Img
            src={trail.image}
            alt={trail.name}
            style={{
              width: '100%',
              height: '130px',
              objectFit: 'cover',
              borderTopLeftRadius: '0.25rem',
              borderBottomLeftRadius: '0.25rem'
            }}
          />
        </Col>

        <Col md={5} className="p-3">
          <Card.Title className="mb-1">{trail.name}</Card.Title>

          <div className="mb-2">
            <Badge bg="secondary" className="me-2">
              {trail.difficulty}
            </Badge>
            <Badge bg="info">{trail.distance}</Badge>
          </div>

          <Card.Text className="text-muted small mb-0">
            {trail.description.substring(0, 95)}...
          </Card.Text>
        </Col>

        <Col
          md={3}
          className="p-3 d-flex flex-column justify-content-center"
        >
          <Link
            to={`/likedtrail/${trail.id}`}
            className="btn btn-success btn-sm w-100 mb-2"
          >
            View Details
          </Link>

          {onUnlike && (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm w-100"
              onClick={onUnlike}
            >
              Unlike
            </button>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default TrailCardWide;
