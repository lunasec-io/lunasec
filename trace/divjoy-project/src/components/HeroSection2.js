import React from "react";
import Container from "react-bootstrap/Container";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

function HeroSection2(props) {
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
          size={1}
          spaced={true}
          className="text-center"
        />
      </Container>
    </Section>
  );
}

export default HeroSection2;
