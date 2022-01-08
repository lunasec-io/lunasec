import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

function ClientsSection(props) {
  const items = [
    {
      name: "Instagram",
      image: "https://uploads.divjoy.com/logo-instagram.svg",
      width: "150px",
    },
    {
      name: "Slack",
      image: "https://uploads.divjoy.com/logo-slack.svg",
      width: "135px",
    },
    {
      name: "Tinder",
      image: "https://uploads.divjoy.com/logo-tinder.svg",
      width: "90px",
    },
    {
      name: "Spotify",
      image: "https://uploads.divjoy.com/logo-spotify.svg",
      width: "135px",
    },
  ];

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container className="text-center">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={2}
          spaced={true}
        />
        <Row className="justify-content-center">
          {items.map((item, index) => (
            <Col md="auto" className="py-3 px-4" key={index}>
              <div className="align-bottom">
                <img src={item.image} width={item.width} alt={item.name} />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
}

export default ClientsSection;
