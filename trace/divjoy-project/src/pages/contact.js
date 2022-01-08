import React from "react";
import Meta from "./../components/Meta";
import ContactSection from "./../components/ContactSection";

function ContactPage(props) {
  return (
    <>
      <Meta title="Contact" />
      <ContactSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Contact Us"
        subtitle=""
        buttonText="Send message"
        buttonColor="primary"
        showNameField={true}
      />
    </>
  );
}

export default ContactPage;
