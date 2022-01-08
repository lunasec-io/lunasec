import React from "react";
import LongContent from "./LongContent";

function LegalPrivacy(props) {
  return (
    <LongContent>
      <h1>Privacy Policy</h1>
      <p>
        This document is a placeholder. You should replace this with your own
        Privacy Policy or create one using&nbsp;
        <a href="https://avodocs.com" target="_blank" rel="noreferrer">
          avodocs.com
        </a>
        ,&nbsp;
        <a href="https://getterms.io" target="_blank" rel="noreferrer">
          getterms.io
        </a>{" "}
        or&nbsp;
        <a href="https://termly.io" target="_blank" rel="noreferrer">
          termly.io
        </a>
        . We've included some example HTML structure below to make adding your
        content easier ↴
      </p>
      <p>
        Your privacy is important to us. It’s our policy to respect your privacy
        and comply with any applicable law and regulation regarding the personal
        information we collect about you through this website, {props.domain},
        and through any associated services and third-party platforms we may
        use.
      </p>
      <p>This policy was last updated on October 5th, 2021.</p>
      <h2>Information we collect</h2>
      <p>
        Personal information is any information about you which can be used to
        identify you. Any information we collect may be automatically collected
        (i.e. information automatically sent to us by your devices when you
        access our services) or voluntarily provided (i.e. information you
        knowingly and actively provide us).
      </p>
      <h3>Automatically collected information</h3>
      <p>
        Our servers automatically log standard data provided by your web browser
        when you visit our website. This data may include your device’s IP
        address, device type, operating system, browser type and version, the
        pages you visit, the time and date of your visit, time spent on each
        page, and other details about your visit or device.
      </p>
      <h3>Another subheader</h3>
      <p>Another paragraph of text</p>
      <h2>Another main header</h2>
      <p>Another paragraph of text</p>
    </LongContent>
  );
}

export default LegalPrivacy;
