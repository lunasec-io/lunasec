import React from "react";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Section from "./Section";
import LegalTerms from "./LegalTerms";
import LegalPrivacy from "./LegalPrivacy";

function LegalSection(props) {
  const validSections = {
    "terms-of-service": true,
    "privacy-policy": true,
  };

  const section = validSections[props.section]
    ? props.section
    : "terms-of-service";

  const data = {
    domain: "company.com",
    companyName: "Company",
  };

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Nav
        variant="pills"
        activeKey={section}
        className="justify-content-center"
      >
        <Nav.Item>
          <LinkContainer to="/legal/terms-of-service">
            <Nav.Link eventKey="terms-of-service">Terms of Service</Nav.Link>
          </LinkContainer>
        </Nav.Item>
        <Nav.Item>
          <LinkContainer to="/legal/privacy-policy">
            <Nav.Link eventKey="privacy-policy">Privacy Policy</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
      <Container className="mt-5">
        {section === "terms-of-service" && <LegalTerms {...data} />}

        {section === "privacy-policy" && <LegalPrivacy {...data} />}
      </Container>
    </Section>
  );
}

export default LegalSection;
