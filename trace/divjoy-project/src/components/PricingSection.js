import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { useAuth } from "./../util/auth";
import "./PricingSection.scss";

function PricingSection(props) {
  const auth = useAuth();

  const items = [
    {
      id: "starter",
      name: "Starter",
      price: "10",
      perks: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "20",
      perks: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa",
        "Faucibus porta lacus fringilla vel",
        "Aenean sit amet erat nunc",
      ],
    },
    {
      id: "business",
      name: "Business",
      price: "50",
      perks: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Integer molestie lorem at massa",
        "Faucibus porta lacus fringilla vel",
        "Aenean sit amet erat nunc",
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
      ],
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
            <Col
              md={12}
              lg={4}
              className="py-3 d-flex align-items-stretch"
              key={index}
            >
              <Card className="w-100">
                <Card.Body className="d-flex flex-column p-4">
                  <h5 className="font-weight-bold mb-4">{item.name}</h5>
                  <h1 className="font-weight-bold mb-3">
                    ${item.price}
                    <small className="PricingSection__period">/mo</small>
                  </h1>

                  {item.description && (
                    <Card.Text className="mb-4">{item.description}</Card.Text>
                  )}

                  {item.perks && (
                    <Card.Text as="span" className="mt-2 mb-3">
                      <ul className="list-unstyled">
                        {item.perks.map((perk, index) => (
                          <li className="py-1" key={index}>
                            <i className="fas fa-check text-success mr-3" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </Card.Text>
                  )}

                  <LinkContainer
                    to={
                      auth.user
                        ? `/purchase/${item.id}`
                        : `/auth/signup?next=/purchase/${item.id}`
                    }
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      block={true}
                      className="mt-auto"
                    >
                      Choose
                    </Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
}

export default PricingSection;
