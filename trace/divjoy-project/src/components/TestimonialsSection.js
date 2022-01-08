import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Avatar from "./Avatar";

function TestimonialsSection(props) {
  const items = [
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-5.jpeg",
      name: "Sarah Kline",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
      company: "Company",
    },
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-48.jpeg",
      name: "Shawna Murray",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!",
      company: "Company",
    },
    {
      avatar: "https://uploads.divjoy.com/pravatar-150x-12.jpeg",
      name: "Blake Elder",
      testimonial:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae.",
      company: "Company",
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
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={2}
          spaced={true}
          className="text-center"
        />
        <Row className="justify-content-center">
          {items.map((item, index) => (
            <Col xs={12} md={4} className="py-3" key={index}>
              <Card>
                <Card.Body className="p-4">
                  <Card.Text>"{item.testimonial}"</Card.Text>
                  <Media className="align-items-center mt-auto">
                    <Avatar src={item.avatar} alt={item.name} size="56px" />
                    <Media.Body className="ml-2">
                      <h6 className="font-weight-bold mb-0">{item.name}</h6>
                      <small>{item.company}</small>
                    </Media.Body>
                  </Media>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
}

export default TestimonialsSection;
