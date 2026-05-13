import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import PageWrapper from "./PageWrapper";
import { ensureUserInfo, saveUserInfo } from '../utils/userInfo';

function Account() {
  const [username, setUsername] = useState("");
  const newUsernameRef = useRef(null);

  useEffect(() => {
    setUsername(ensureUserInfo().username);
  }, []);

  const handleUsernameChange = (e) => {
    e.preventDefault();
    if (!newUsernameRef.current.value.trim()) {
      alert("Your username must have at least one character!");
      return;
    }
    const newUsername = newUsernameRef.current.value.trim();
    const newUserInfo = ensureUserInfo();
    newUserInfo.username = newUsername;
    saveUserInfo(newUserInfo);
    setUsername(newUsername);
    newUsernameRef.current.value = "";
  };

  const handleAccountReset = () => {
    const confirmation = confirm(
      "WARNING: Resetting your account will reset your username and remove all saved trails. Continue?"
    );

    if (confirmation) {
      saveUserInfo({
        username: "Anonymous",
        likedTrails: []
      });
      setUsername("Anonymous");
    }
  };

  const isAnonymous = !username || username === "Anonymous";

  return (
    <PageWrapper>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="text-center mb-4">Account</h1>

          <Card className="shadow-sm">
            <Card.Body className="p-4">

              <h2 className="h4 mb-2">Profile</h2>

              {isAnonymous ? (
                <p className="text-muted small mb-3">
                  You haven't told us your name yet!
                  <br />
                  Set a username below so you can save trails in this browser.
                </p>
              ) : (
                <p className="text-muted small mb-3">
                  You're signed in as <strong>{username}</strong>!
                  <br />
                  You can save trails and manage your local trail list from here.
                </p>
              )}

              <Form onSubmit={handleUsernameChange} className="mb-4">
                <Form.Group className="mb-3">
                  <Form.Label for="new-username">New Username</Form.Label>
                  <Form.Control
                    ref={newUsernameRef}
                    id="new-username"
                    placeholder="Enter a new display name"
                  />
                </Form.Group>
                <Button type="submit" className="w-100">
                  Change Username
                </Button>
              </Form>

              <hr />

              <h2 className="h5 mb-2">Danger zone</h2>
              <p className="text-muted small mb-3">
                Resetting your account will clear your username and remove all saved trails.
                This is similar to logging out and starting fresh.
              </p>
              <Button
                variant="outline-danger"
                onClick={handleAccountReset}
                className="w-100"
              >
                Reset Account
              </Button>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
}

export default Account;
