import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Form, Row } from "react-bootstrap";
import PageWrapper from "./PageWrapper";
import {
  createCustomTrail,
  CUSTOM_TRAIL_THEMES,
  deleteCustomTrail,
  getCustomTrails,
  updateCustomTrail
} from "../utils/customTrails";
import {
  COUNTRY_OPTIONS,
  getCityOptions,
  getRegionOptions,
  isSupportedCountry,
  OTHER_OPTION
} from "../data/locationOptions";

const GOAL_OPTIONS = ["Walk", "Hike", "Picnic", "Photography", "Research later"];

const EMPTY_FORM = {
  name: "",
  country: "United States",
  customCountry: "",
  state: "Wisconsin",
  customState: "",
  city: "Madison",
  customCity: "",
  difficulty: "",
  distanceValue: "",
  distanceUnit: "mi",
  plannedDate: "",
  goal: "",
  imageUrl: "",
  notes: ""
};

function resolveLocationValue(selection, customValue) {
  return selection === OTHER_OPTION ? customValue.trim() : selection;
}

function hasRegionOptions(country) {
  return getRegionOptions(country).length > 0;
}

function hasCityOptions(country, state) {
  return getCityOptions(country, state).length > 0;
}

function formatLocation(trail) {
  const location = trail.location || {};
  const formatted = [location.city, location.state, location.country]
    .filter(Boolean)
    .join(", ");

  return formatted || "Location not specified";
}

function formatDistance(trail) {
  return trail.distanceValue ? `${trail.distanceValue} ${trail.distanceUnit}` : "";
}

function isValidImageUrl(url) {
  if (!url) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function toStoredTrail(formData) {
  const country =
    formData.country === OTHER_OPTION
      ? formData.customCountry.trim()
      : formData.country;
  const state = hasRegionOptions(formData.country)
    ? resolveLocationValue(formData.state, formData.customState)
    : formData.customState.trim();
  const city = hasCityOptions(formData.country, formData.state)
    ? resolveLocationValue(formData.city, formData.customCity)
    : formData.customCity.trim();

  return {
    name: formData.name,
    location: {
      country,
      state,
      city,
      customCountry: formData.customCountry.trim(),
      customState: formData.customState.trim(),
      customCity: formData.customCity.trim()
    },
    difficulty: formData.difficulty,
    distanceValue: formData.distanceValue,
    distanceUnit: formData.distanceUnit,
    plannedDate: formData.plannedDate,
    goal: formData.goal,
    imageUrl: formData.imageUrl,
    notes: formData.notes
  };
}

function toFormData(trail) {
  const location = trail.location || {};
  const country = COUNTRY_OPTIONS.includes(location.country)
    ? location.country
    : location.country
      ? OTHER_OPTION
      : "United States";
  const regionOptions = getRegionOptions(country);
  const state = regionOptions.includes(location.state)
    ? location.state
    : location.state && regionOptions.length > 0
      ? OTHER_OPTION
      : country === "United States" && !location.state
        ? "Wisconsin"
        : "";
  const cityOptions = getCityOptions(country, state);
  const city = cityOptions.includes(location.city)
    ? location.city
    : location.city
      ? OTHER_OPTION
      : hasCityOptions(country, state)
        ? "Madison"
        : "";

  return {
    name: trail.name,
    country,
    customCountry:
      country === OTHER_OPTION
        ? location.country || location.customCountry || ""
        : "",
    state,
    customState:
      state === OTHER_OPTION || !hasRegionOptions(country)
        ? location.state || location.customState || ""
        : "",
    city,
    customCity:
      city === OTHER_OPTION || !hasCityOptions(country, state)
        ? location.city || location.customCity || ""
        : "",
    difficulty: trail.difficulty,
    distanceValue: trail.distanceValue,
    distanceUnit: trail.distanceUnit,
    plannedDate: trail.plannedDate,
    goal: trail.goal,
    imageUrl: trail.imageUrl,
    notes: trail.notes
  };
}

function MyTrails() {
  const [customTrails, setCustomTrails] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const stateOptions = getRegionOptions(formData.country);
  const cityOptions = getCityOptions(formData.country, formData.state);
  const showManualCountry = formData.country === OTHER_OPTION;
  const showManualState =
    formData.country === OTHER_OPTION ||
    stateOptions.length === 0 ||
    formData.state === OTHER_OPTION;
  const showManualCity =
    formData.country === OTHER_OPTION ||
    cityOptions.length === 0 ||
    formData.city === OTHER_OPTION;

  useEffect(() => {
    setCustomTrails(getCustomTrails());
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => {
      if (name === "country") {
        return {
          ...current,
          country: value,
          customCountry: value === OTHER_OPTION ? current.customCountry : "",
          state: "",
          customState: "",
          city: "",
          customCity: ""
        };
      }

      if (name === "state") {
        return {
          ...current,
          state: value,
          customState: value === OTHER_OPTION ? current.customState : "",
          city: "",
          customCity: ""
        };
      }

      if (name === "city") {
        return {
          ...current,
          city: value,
          customCity: value === OTHER_OPTION ? current.customCity : ""
        };
      }

      return {
        ...current,
        [name]: value
      };
    });
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const trailData = toStoredTrail(formData);
    const nextTrails = editingId
      ? updateCustomTrail(editingId, trailData)
      : createCustomTrail(trailData);

    setCustomTrails(nextTrails);
    resetForm();
  };

  const handleEdit = (trail) => {
    setEditingId(trail.id);
    setFormData(toFormData(trail));
  };

  const handleDelete = (trailId) => {
    setCustomTrails(deleteCustomTrail(trailId));

    if (editingId === trailId) {
      resetForm();
    }
  };

  return (
    <PageWrapper>
      <div className="saved-page my-trails-page">
        <div className="saved-page-header my-trails-header">
          <div>
            <p className="section-label">Personal trail planning notebook</p>
            <h1>My Trails</h1>
            <p>
              Save trail ideas, places to research, and future hiking plans.
              Custom trails, image URLs, and planning notes are saved only in
              your own browser with localStorage.
            </p>
          </div>
        </div>

        <Row className="g-4 align-items-start">
          <Col lg={5}>
            <Card className="trail-note-card">
              <Card.Body>
                <div className="trail-note-card-heading">
                  <div>
                    <p className="section-label">Trail note</p>
                    <Card.Title>
                      {editingId ? "Edit Custom Trail" : "Create Custom Trail"}
                    </Card.Title>
                  </div>
                  {editingId && <Badge bg="success">Editing</Badge>}
                </div>
                <Card.Text className="text-muted">
                  Trail name is required. Location and planning details are
                  optional and can be filled in later.
                </Card.Text>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="customTrailName">
                    <Form.Label>Trail name</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Example: Governor Nelson shoreline walk"
                      required
                    />
                  </Form.Group>

                  <div className="form-section-title">Location</div>
                  <Row>
                    <Col md={stateOptions.length > 0 ? 4 : 12}>
                      <Form.Group className="mb-3" controlId="customTrailCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        >
                          {COUNTRY_OPTIONS.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {showManualCountry && (
                      <Col md={12}>
                        <Form.Group className="mb-3" controlId="customTrailCountryOther">
                          <Form.Label>Country name</Form.Label>
                          <Form.Control
                            name="customCountry"
                            value={formData.customCountry}
                            onChange={handleChange}
                            placeholder="Country"
                          />
                        </Form.Group>
                      </Col>
                    )}

                    {stateOptions.length > 0 && (
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="customTrailState">
                          <Form.Label>State / Province</Form.Label>
                          <Form.Select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        >
                          <option value="">Choose state / province</option>
                          {stateOptions.map((state) => (
                            <option key={state} value={state}>
                              {state}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    )}

                    {cityOptions.length > 0 && (
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="customTrailCity">
                          <Form.Label>City</Form.Label>
                          <Form.Select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          <option value="">Choose city</option>
                          {cityOptions.map((city) => (
                            <option key={city} value={city}>
                              {city}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    )}
                  </Row>

                  {(showManualState || showManualCity) && (
                    <Row>
                      {showManualState && (
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="customTrailStateOther">
                            <Form.Label>State / Province</Form.Label>
                            <Form.Control
                              name="customState"
                              value={formData.customState}
                              onChange={handleChange}
                              placeholder="Optional state or province"
                            />
                          </Form.Group>
                        </Col>
                      )}
                      {showManualCity && (
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="customTrailCityOther">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              name="customCity"
                              value={formData.customCity}
                              onChange={handleChange}
                              placeholder="Optional city"
                            />
                          </Form.Group>
                        </Col>
                      )}
                    </Row>
                  )}

                  <div className="form-section-title">Trail details</div>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="customTrailDifficulty">
                        <Form.Label>Difficulty</Form.Label>
                        <Form.Select
                          name="difficulty"
                          value={formData.difficulty}
                          onChange={handleChange}
                        >
                          <option value="">Not sure yet</option>
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="customTrailGoal">
                        <Form.Label>Trail type / goal</Form.Label>
                        <Form.Select
                          name="goal"
                          value={formData.goal}
                          onChange={handleChange}
                        >
                          <option value="">Choose later</option>
                          {GOAL_OPTIONS.map((goal) => (
                            <option key={goal} value={goal}>
                              {goal}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={7}>
                      <Form.Group className="mb-3" controlId="customTrailDistance">
                        <Form.Label>Distance</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="200"
                          step="0.1"
                          name="distanceValue"
                          value={formData.distanceValue}
                          onChange={handleChange}
                          placeholder="Example: 2.5"
                        />
                        <Form.Text className="text-muted">
                          Optional. Values over 200 are ignored when saved.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group className="mb-3" controlId="customTrailDistanceUnit">
                        <Form.Label>Unit</Form.Label>
                        <Form.Select
                          name="distanceUnit"
                          value={formData.distanceUnit}
                          onChange={handleChange}
                        >
                          <option value="mi">mi</option>
                          <option value="km">km</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="customTrailPlannedDate">
                    <Form.Label>Planned visit date</Form.Label>
                    <Form.Control
                      type="date"
                      name="plannedDate"
                      value={formData.plannedDate}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="customTrailImageUrl">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/trail-photo.jpg"
                    />
                    <Form.Text className="text-muted">
                      Optional. Image URLs are saved only in this browser. No
                      image files are uploaded or shared by this app.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="customTrailNotes">
                    <Form.Label>Planning notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Parking ideas, restroom checks, route plans, or questions to research later."
                    />
                  </Form.Group>

                  <div className="trail-note-actions">
                    <Button type="submit" variant="success">
                      {editingId ? "Save Changes" : "Add Trail Note"}
                    </Button>
                    {editingId && (
                      <Button type="button" variant="outline-secondary" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <div className="custom-trail-list-heading">
              <div>
                <p className="section-label">Saved locally</p>
                <h2>Your planning notes</h2>
              </div>
              <Badge bg="success">{customTrails.length} total</Badge>
            </div>

            {customTrails.length === 0 ? (
              <Card className="saved-empty-card custom-trails-empty text-center">
                <Card.Body>
                  <div className="empty-state-icon">MT</div>
                  <Card.Title>No custom trail notes yet</Card.Title>
                  <Card.Text className="text-muted">
                    Start with a trail name, then add location, distance,
                    planned date, images, and planning notes when you have them.
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <div className="custom-trail-grid">
                {customTrails.map((trail) => {
                  const location = formatLocation(trail);
                  const distance = formatDistance(trail);
                  const hasImage = isValidImageUrl(trail.imageUrl);
                  const theme = CUSTOM_TRAIL_THEMES[trail.theme] || CUSTOM_TRAIL_THEMES.forest;

                  return (
                    <Card className="custom-trail-card" key={trail.id}>
                      {hasImage ? (
                        <div
                          className="custom-trail-image"
                          style={{ backgroundImage: `url("${trail.imageUrl}")` }}
                          aria-label={`${trail.name} image`}
                        />
                      ) : (
                        <div
                          className="custom-trail-image custom-trail-image-placeholder"
                          style={{ background: theme.gradient }}
                        >
                          <span>{trail.name.slice(0, 2).toUpperCase()}</span>
                        </div>
                      )}

                      <Card.Body>
                        <div className="custom-trail-card-header">
                          <div>
                            <Card.Title>{trail.name}</Card.Title>
                            {location && (
                              <Card.Subtitle className="text-muted">
                                {location}
                              </Card.Subtitle>
                            )}
                          </div>
                        </div>

                        {(trail.difficulty || distance || trail.goal) && (
                          <div className="custom-trail-badge-row">
                            {trail.difficulty && (
                              <Badge bg="secondary">{trail.difficulty}</Badge>
                            )}
                            {distance && <Badge bg="info">{distance}</Badge>}
                            {trail.goal && <Badge bg="success">{trail.goal}</Badge>}
                          </div>
                        )}

                        {trail.plannedDate && (
                          <div className="custom-trail-meta">
                            <span>Planned: {trail.plannedDate}</span>
                          </div>
                        )}

                        {trail.notes ? (
                          <Card.Text className="custom-trail-notes">
                            {trail.notes}
                          </Card.Text>
                        ) : (
                          <Card.Text className="custom-trail-notes text-muted">
                            No planning notes yet. Edit this trail when you
                            have parking, restroom, map, or route details.
                          </Card.Text>
                        )}

                        <div className="custom-trail-actions">
                          <Button
                            type="button"
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleEdit(trail)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(trail.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </PageWrapper>
  );
}

export default MyTrails;
