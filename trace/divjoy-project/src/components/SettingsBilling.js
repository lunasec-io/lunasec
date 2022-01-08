import React, { useEffect, useState } from "react";
import PageLoader from "./PageLoader";
import { useAuth } from "./../util/auth";
import { useRouter } from "./../util/router";
import { redirectToBilling } from "./../util/stripe";

function SettingsBilling(props) {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.user.planIsActive) {
      // If user has an active plan then
      // take them to Stripe billing
      redirectToBilling().catch((error) => {
        setLoading(false);
        props.onStatus({
          type: "error",
          message: error.message,
        });
      });
    } else {
      // Otherwise go to pricing so they can
      // purchase a plan
      router.replace("/pricing");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && (
        <PageLoader
          style={{
            height: "50px",
          }}
        />
      )}
    </>
  );
}

export default SettingsBilling;
