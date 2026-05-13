import { Container } from "react-bootstrap";

function PageWrapper({ children }) {
  return (
    <Container className="py-4">
      <div style={{ margin: "0 auto", width: "100%" }}>
        {children}
      </div>
    </Container>
  );
}

export default PageWrapper;
