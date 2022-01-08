import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Section from "./Section";
import { Link } from "./../util/router";
import "./Footer.scss";

function Footer(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className="footer"
    >
      <Container fluid="lg">
        <Row>
          <Col>
            <Link to="/">
              <div>
                <img
                  className="FooterComponent__logo"
                  src={props.logo}
                  alt="Logo"
                />
              </div>
            </Link>

            {props.description && (
              <p className="FooterComponent__description">
                {props.description}
              </p>
            )}

            <p className="FooterComponent__copyright">
              {props.copyright}
              <Link to="/legal/terms-of-service">Terms</Link>
              <Link to="/legal/privacy-policy">Privacy</Link>
            </p>
          </Col>
          <Col md={{ span: 7, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <div className="FooterComponent__menus">
              <Row>
                <Col xs={12} md={4} className="mt-3 mt-md-0">
                  <h5>Product</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/pricing">Pricing</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQ</Link>
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0">
                  <h5>Company</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://medium.com"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={4} className="mt-3 mt-md-0">
                  <h5>Social</h5>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://twitter.com/divjoy"
                      >
                        <img
                          src="https://uploads.divjoy.com/icon-twitter.svg"
                          alt="Twitter"
                        />
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://facebook.com/DivjoyOfficial"
                      >
                        <img
                          src="https://uploads.divjoy.com/icon-facebook.svg"
                          alt="Facebook"
                        />
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://instagram.com"
                      >
                        <img
                          src="https://uploads.divjoy.com/icon-instagram.svg"
                          alt="Instagram"
                        />
                        Instagram
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default Footer;
