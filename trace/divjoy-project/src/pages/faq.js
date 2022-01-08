import React from "react";
import Meta from "./../components/Meta";
import FaqSection from "./../components/FaqSection";
import CtaSection from "./../components/CtaSection";

function FaqPage(props) {
  return (
    <>
      <Meta title="Faq" />
      <FaqSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Frequently Asked Questions"
        subtitle=""
      />
      <CtaSection
        bg="primary"
        textColor="light"
        size="sm"
        bgImage=""
        bgImageOpacity={1}
        title="Ready to get started?"
        subtitle=""
        buttonText="Get Started"
        buttonColor="light"
        buttonPath="/pricing"
      />
    </>
  );
}

export default FaqPage;
