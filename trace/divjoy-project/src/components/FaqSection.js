import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import "./FaqSection.scss";

function FaqSection(props) {
  // Object to store expanded state for all items
  const [expanded, setExpanded] = useState({});
  // Set an item's expanded state
  const setExpandedItem = (index, isExpanded) => {
    setExpanded({
      ...expanded,
      [index]: isExpanded,
    });
  };

  const items = [
    {
      question: "Integer ornare neque mauris?",
      answer:
        "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus. Suspendisse ut tincidunt eros. In velit mi, rhoncus dictum neque a, tincidunt lobortis justo.",
    },
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Nunc nulla mauris, laoreet vel cursus lacinia, consectetur sit amet tellus. Suspendisse ut tincidunt eros. In velit mi, rhoncus dictum neque a, tincidunt lobortis justo.",
    },
    {
      question: "Suspendisse ut tincidunt?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis, metus et mattis ullamcorper. Suspendisse ut tincidunt eros. In velit mi, rhoncus dictum neque a, tincidunt lobortis justo.",
    },
    {
      question: "Ut enim ad minim veniam?",
      answer:
        "Suspendisse ut tincidunt eros. In velit mi, rhoncus dictum neque a, tincidunt lobortis justo.",
    },
    {
      question: "In velit mi, rhoncus dictum neque?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
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

        {items.map((item, index) => (
          <article
            className="FaqSection__faq-item py-4"
            onClick={() => {
              setExpandedItem(index, !expanded[index]);
            }}
            key={index}
          >
            <h4>
              <span className="text-primary mr-3">
                <i
                  className={
                    "fas" +
                    (expanded[index] ? " fa-minus" : "") +
                    (!expanded[index] ? " fa-plus" : "")
                  }
                />
              </span>
              {item.question}
            </h4>

            {expanded[index] && <div className="mt-3">{item.answer}</div>}
          </article>
        ))}
      </Container>
    </Section>
  );
}

export default FaqSection;
