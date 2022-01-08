import React from "react";
import Meta from "./../components/Meta";

function NotFoundPage(props) {
  return (
    <>
      <Meta title="404" />
      <div
        style={{
          padding: "50px",
          width: "100%",
          textAlign: "center",
        }}
      >
        The page <code>{props.location.pathname}</code> could not be found
      </div>
    </>
  );
}

export default NotFoundPage;
