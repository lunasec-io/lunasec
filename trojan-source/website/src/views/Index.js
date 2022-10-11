import React from "react";

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import IndexFooter from "components/Footers/IndexFooter.js";

// index sections
import SectionDescription from "views/index-sections/SectionDescription.js";
import SectionMountains from "views/index-sections/SectionMountains.js";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <SectionDescription />
        <SectionMountains />
        <IndexFooter />
      </div>
    </>
  );
}

export default Index;
