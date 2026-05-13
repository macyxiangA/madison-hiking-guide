import { Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function TrailCard({ trail }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={trail.image} 
        style={{ height: '200px', objectFit: 'cover' }}
        alt={trail.name}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{trail.name}</Card.Title>
        
        <div className="mb-2">
          <Badge bg="secondary" className="me-2">{trail.difficulty}</Badge>
          <Badge bg="info">{trail.distance}</Badge>
        </div>
        
        <Card.Text className="text-muted small mb-3 flex-grow-1">
          {trail.description.substring(0, 100)}...
        </Card.Text>
        
        <Link to={`/trail/${trail.id}`} className="btn btn-success w-100">
          View Details
        </Link>
      </Card.Body>
    </Card>
  )
}

export default TrailCard