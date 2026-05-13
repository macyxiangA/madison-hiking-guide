import { Row, Col, Card, Badge } from 'react-bootstrap'
import PageWrapper from "./PageWrapper";

function About() {
  const appHighlights = [
    {
      title: "Compare local trails",
      text: "Browse a curated set of Madison-area routes with quick summaries, photos, difficulty labels, and distance notes."
    },
    {
      title: "Plan before you go",
      text: "Open official maps, get directions, and check practical visit details like parking and restroom availability."
    },
    {
      title: "Save your short list",
      text: "Like trails you want to revisit later and keep a personal list on this device for easy trip planning."
    }
  ];

  const guideDetails = [
    "Difficulty ratings for quick route matching",
    "Trail distance and location context",
    "Parking notes from official visitor information",
    "Restroom availability and planning caveats",
    "Official map links and turn-by-turn directions",
    "Feature tags such as lake views, bike access, dog-friendly areas, boat launches, campsites, and indoor areas"
  ];

  const technologies = [
    "React",
    "Vite",
    "React Router",
    "React Bootstrap",
    "Bootstrap",
    "localStorage"
  ];

  return (
    <PageWrapper>
      <div className="about-page">
        <section className="about-hero">
          <div>
            <Badge bg="success" className="about-kicker mb-3">
              Madison trail planning
            </Badge>
            <h1>Find a better walk, hike, or weekend reset around Madison.</h1>
            <p>
              Madison Hiking Guide is a simple planning companion for exploring
              local parks, lakeside paths, conservancies, gardens, and wooded
              routes. It brings the key details into one readable place so you
              can choose a trail with confidence before heading out.
            </p>
          </div>
        </section>

        <Row className="g-4 mb-4">
          {appHighlights.map((item) => (
            <Col md={4} key={item.title}>
              <Card className="about-card h-100">
                <Card.Body>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="g-4 align-items-stretch">
          <Col lg={7}>
            <Card className="about-card about-feature-card h-100">
              <Card.Body>
                <p className="section-label">What's in the guide</p>
                <h2>Trail details that help you choose the right outing.</h2>
                <p>
                  The guide focuses on the decisions hikers usually make before
                  leaving home: how long the route is, how difficult it feels,
                  where to park, whether restrooms are available, and how to
                  open the official visitor map or directions quickly.
                </p>

                <div className="about-detail-grid">
                  {guideDetails.map((detail) => (
                    <div className="about-detail-item" key={detail}>
                      <span className="about-check">&#10003;</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card className="about-card about-side-card mb-4">
              <Card.Body>
                <p className="section-label">Privacy and local data</p>
                <h2>Your trail list stays in your browser.</h2>
                <p>
                  Liked trails and the username you set on the Account page are
                  saved with localStorage in your own browser. The app uses that
                  local data to remember your preferences on this device and does
                  not require an account or remote sign-in.
                </p>
              </Card.Body>
            </Card>

            <Card className="about-card about-side-card">
              <Card.Body>
                <p className="section-label">Built with</p>
                <h2>A lightweight React stack.</h2>
                <div className="about-tech-list">
                  {technologies.map((tech) => (
                    <Badge bg="light" text="dark" key={tech}>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <section className="about-closing">
          <Row className="g-4 align-items-center">
            <Col lg={8}>
              <h2>Designed for practical, low-friction trail discovery.</h2>
              <p>
                Whether you want an easy lakeside walk, a longer route through
                prairie and forest, or a park with better amenities, the guide is
                organized to make the next choice faster.
              </p>
            </Col>
            <Col lg={4}>
              <div className="about-stat">
                <strong>8</strong>
                <span>Madison-area destinations currently included</span>
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </PageWrapper>
  )
}

export default About
