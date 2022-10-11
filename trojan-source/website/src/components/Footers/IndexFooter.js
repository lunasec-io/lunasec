/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col, Container } from "reactstrap";

function IndexFooter() {
  return (
    <footer className="footer footer-dark">
      <Container>
        <Row>
          <Col xs={6} className="footer-text">
            <div>
              Produced by researchers at the University of Cambridge.
            </div>
          </Col>
          <Col xs={6}>
          <div className="credits ml-auto footer-text">
            <span className="copyright">
              © {new Date().getFullYear()} <a href="https://www.cl.cam.ac.uk/~ndb40" target="_blank">Nicholas Boucher</a> with thanks to <a href="https://github.com/creativetimofficial/paper-kit-react" rel="noreferrer" target="_blank">Paper Kit React</a> and <a href="https://www.srcf.net" rel="noreferrer" target="_blank">SRCF</a>.<br />
            </span>
          </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default IndexFooter;
