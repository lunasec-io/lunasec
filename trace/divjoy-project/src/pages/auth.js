import React from "react";
import Meta from "./../components/Meta";
import AuthSection from "./../components/AuthSection";
import { useRouter } from "./../util/router";

function AuthPage(props) {
  const router = useRouter();

  return (
    <>
      <Meta title="Auth" />
      <AuthSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        type={router.query.type}
        providers={["google", "facebook", "twitter"]}
        afterAuthPath={router.query.next || "/dashboard"}
      />
    </>
  );
}

export default AuthPage;
