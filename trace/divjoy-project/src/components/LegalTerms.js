import React from "react";
import LongContent from "./LongContent";

function LegalTerms(props) {
  return (
    <LongContent>
      <h1>Terms of Service</h1>
      <p>
        This document is a placeholder. You should replace this with your own
        Terms of Service or create one using&nbsp;
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
        These Terms of Service govern your use of {props.domain} and any related
        services provided by {props.companyName}. By accessing {props.domain},
        you agree to abide by these Terms of Service and to comply with all
        applicable laws and regulations.
      </p>
      <p>
        If you do not agree with these Terms of Service, you are prohibited from
        using or accessing {props.domain} and from using any other services we
        provide. We reserve the right to review and amend any of these Terms of
        Service at our sole discretion. Upon doing so, we will update this page.
        Any changes to these Terms of Service will take effect immediately from
        the date of publication.
      </p>
      <p>This policy was last updated on October 5th, 2021.</p>
      <h2>Limitations of Use</h2>
      <p>
        By using {props.domain}, you warrant on behalf of yourself, your users,
        and other parties you represent that you will not:
      </p>
      <ol>
        <li>
          modify, copy, prepare derivative works of, decompile, or reverse
          engineer any materials and software contained on the GetTerms.io
          website.
        </li>
        <li>
          remove any copyright or other proprietary notations from any materials
          and software on the {props.domain} website.
        </li>
        <li>etc</li>
      </ol>
      <h2>Another header</h2>
      <p>Another paragraph of text</p>
    </LongContent>
  );
}

export default LegalTerms;
