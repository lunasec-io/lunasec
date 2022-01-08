import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import AspectRatio from "./AspectRatio";
import "./FeaturesSection.scss";

function FeaturesSection(props) {
  const items = [
    {
      title: "Lorem Ipsum",
      body: "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus.",
      image: "https://uploads.divjoy.com/undraw-fish_bowl_uu88.svg",
    },
    {
      title: "Lorem Ipsum",
      body: "Nunc nulla mauris, laoreet vel cursus lacinia, consectetur sit amet tellus.",
      image: "https://uploads.divjoy.com/undraw-directions_x53j.svg",
    },
    {
      title: "Lorem Ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis, metus et mattis ullamcorper",
      image: "https://uploads.divjoy.com/undraw-stability_ball_b4ia.svg",
    },
    {
      title: "Lorem Ipsum",
      body: "Suspendisse ut tincidunt eros. In velit mi, rhoncus dictum neque a, tincidunt lobortis justo",
      image: "https://uploads.divjoy.com/undraw-personal_settings_kihd.svg",
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
        <Card>
          <Row className="no-gutters overflow-hidden">
            {items.map((item, index) => (
              <Col
                xs={12}
                lg={6}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "center",
                  boxShadow: "1px 1px 0 0 #efefef",
                }}
                key={index}
              >
                <div className="FeaturesSection__item has-text-centered">
                  <div className="FeaturesSection__image-container">
                    <AspectRatio ratio={4 / 3}>
                      <Image src={item.image} alt={item.title} fluid={true} />
                    </AspectRatio>
                  </div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
