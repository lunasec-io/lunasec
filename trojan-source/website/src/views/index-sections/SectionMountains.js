import React from "react";
import { png } from "components/Compatability/Webp"


function SectionMountains() {
  return (
    <>
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/mountains." + png).default + ")",
        }}
      >
      </div>{" "}
    </>
  );
}

export default SectionMountains;
