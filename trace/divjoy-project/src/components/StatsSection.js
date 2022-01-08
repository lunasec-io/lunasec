import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Section from "./Section";

function StatsSection(props) {
  const items = [
    {
      title: "Tweets",
      stat: "3,456",
    },
    {
      title: "Following",
      stat: "123",
    },
    {
      title: "Followers",
      stat: "456k",
    },
    {
      title: "Likes",
      stat: "789",
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
        <Row className="justify-content-center">
          {items.map((item, index) => (
            <Col xs={12} md={3} className="py-3 px-4" key={index}>
              <div>
                <small className="text-uppercase">{item.title}</small>
                <h2 className="mt-2">{item.stat}</h2>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
}

export default StatsSection;
