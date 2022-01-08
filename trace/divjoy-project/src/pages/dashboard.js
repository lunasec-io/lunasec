import React from "react";
import Meta from "./../components/Meta";
import DashboardSection from "./../components/DashboardSection";
import { requireAuth } from "./../util/auth";

function DashboardPage(props) {
  return (
    <>
      <Meta title="Dashboard" />
      <DashboardSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Dashboard"
        subtitle=""
      />
    </>
  );
}

export default requireAuth(DashboardPage);
