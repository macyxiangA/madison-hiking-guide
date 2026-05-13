import { Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TrailCardWide from "./TrailCardWide";
import StatsPanel from "./StatsPanel";
import PageWrapper from "./PageWrapper";
import { ensureUserInfo, saveUserInfo } from "../utils/userInfo";

function LikedTrailList({ trails }) {
  const [username, setUsername] = useState("");
  const [likedTrailIds, setLikedTrailIds] = useState([]);

  useEffect(() => {
    const userInfo = ensureUserInfo();
    setUsername(userInfo.username);
    setLikedTrailIds(userInfo.likedTrails);
  }, []);

  const likedTrails = trails.filter((trail) =>
    likedTrailIds.includes(trail.id.toString())
  );

  const handleUnlike = (trailId) => {
    const newUserInfo = ensureUserInfo();
    newUserInfo.likedTrails = newUserInfo.likedTrails.filter(
      (id) => id !== trailId
    );

    saveUserInfo(newUserInfo);
    setLikedTrailIds((old) => old.filter((id) => id !== trailId));
  };

  const displayName =
    username && username !== "Anonymous" ? username : "Your";

  const pageTitle =
    displayName === "Your"
      ? "Your Saved Trails"
      : `${displayName}'s Saved Trails`;

  return (
    <PageWrapper>
      <h1 className="text-center mb-4">{pageTitle}</h1>

      {likedTrails.length === 0 ? (
        <Row className="align-items-start">
          <Col md={8} className="mb-4">
            <Card className="saved-empty-card text-center">
              <Card.Body>
                <Card.Title className="mb-2">
                  No saved trails yet
                </Card.Title>
                <Card.Text className="text-muted mb-3">
                  Explore trails and save the ones you may want to revisit.
                  Your saved list stays in this browser.
                </Card.Text>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  <Button as={Link} to="/trails" variant="success">
                    Explore Trails
                  </Button>
                  <Button as={Link} to="/my-trails" variant="outline-success">
                    Create a Trail Note
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <StatsPanel trails={trails} likedIds={likedTrailIds} />
          </Col>
        </Row>
      ) : (
        <Row className="align-items-start">
          <Col md={8} className="mb-4">
            {likedTrails.map((trail) => (
              <div key={trail.id} className="mb-3">
                <TrailCardWide
                  trail={trail}
                  onUnlike={() => handleUnlike(trail.id.toString())}
                />
              </div>
            ))}
          </Col>

          <Col md={4} className="mb-4">
            <StatsPanel trails={trails} likedIds={likedTrailIds} />
          </Col>
        </Row>
      )}
    </PageWrapper>
  );
}

export default LikedTrailList;
