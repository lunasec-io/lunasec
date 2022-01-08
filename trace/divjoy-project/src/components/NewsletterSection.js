import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Newsletter from "./Newsletter";

function NewsletterSection(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} lg={6}>
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={2}
              spaced={false}
            />
          </Col>
          <Col xs={12} lg={6} className="mt-4 mt-lg-0">
            <Newsletter
              buttonText={props.buttonText}
              buttonColor={props.buttonColor}
              inputPlaceholder={props.inputPlaceholder}
              subscribedMessage={props.subscribedMessage}
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default NewsletterSection;
