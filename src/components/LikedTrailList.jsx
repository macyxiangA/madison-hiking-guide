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
      ? "Your Liked Trails"
      : `${displayName}'s Liked Trails`;

  return (
    <PageWrapper>
      <h1 className="text-center mb-4">{pageTitle}</h1>

      {likedTrails.length === 0 ? (
        <Row className="align-items-start">
          <Col md={8} className="mb-4">
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title className="mb-2">
                  No liked trails yet
                </Card.Title>
                <Card.Text className="text-muted mb-3">
                  Start exploring hikes on the Home page and <br />
                  tap the heart button on a trail to save it here.
                </Card.Text>
                <Button as={Link} to="/p42/" variant="success">
                  Browse trails
                </Button>
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
