import { useParams, Link } from 'react-router-dom'
import { Row, Col, Card, Badge, Alert, Button } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import TrailFeatureChips from './TrailFeatureChips'
import TrailVisitInfo from './TrailVisitInfo'
import PageWrapper from "./PageWrapper";
import { ensureUserInfo, saveUserInfo } from '../utils/userInfo';

function TrailDetail({ trails }) {
  const { id } = useParams()
  const trail = trails.find(t => t.id === parseInt(id))
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(ensureUserInfo().likedTrails.includes(id));
  }, [id])

  const handleLike = (e) => {
    e.preventDefault();
    const newUserInfo = ensureUserInfo();

    if (newUserInfo.username === "Anonymous") {
      alert("To like trails, please set a username in the Account page first.");
      return;
    }

    if (isLiked) {
      newUserInfo.likedTrails = newUserInfo.likedTrails.filter(i => i !== id);
    } else {
      newUserInfo.likedTrails.push(id);
    }

    saveUserInfo(newUserInfo);
    setIsLiked(old => !old);
  };


  if (!trail) {
    return (
      <PageWrapper>
        <Alert variant="danger">Trail not found</Alert>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Link to="/" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft className="me-2" />
        Back to All Trails
      </Link>

      <Row>
        <Col lg={8}>
          <img
            src={trail.image}
            alt={trail.name}
            className="w-100 rounded mb-3"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />

          <h1>{trail.name}</h1>
          <p className="text-muted mb-2">📍 {trail.location}</p>

          <div className="mb-3">
            <Badge bg="secondary" className="me-2 px-3 py-2">
              {trail.difficulty}
            </Badge>
            <Badge bg="info" className="px-3 py-2">
              {trail.distance}
            </Badge>
          </div>

          <Card className="mb-4">
            <Card.Body>
              <h5>About This Trail</h5>
              <p>{trail.description}</p>

              <h6 className="mt-3">Features</h6>
              <TrailFeatureChips features={trail.features} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-3">
            <Card.Body>
              <h5>Trail Information</h5>
              <hr />
              <div className="mb-2">
                <strong>Difficulty:</strong> {trail.difficulty}
              </div>
              <div className="mb-2">
                <strong>Distance:</strong> {trail.distance}
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Button onClick={handleLike}>
                ❤️ {isLiked ? "Unlike" : "Like"} this trail
              </Button>
            </Card.Body>
          </Card>
          <TrailVisitInfo trail={trail} />
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default TrailDetail
