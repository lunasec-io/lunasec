import React from "react";
import { Link } from "./../util/router";
import "./AuthFooter.scss";

function AuthFooter(props) {
  return (
    <div className="AuthFooter text-center text-secondary mt-4 px-2">
      {props.type === "signup" && (
        <>
          {props.showAgreement && (
            <div className="mb-4">
              By signing up, you are agreeing to our{" "}
              <Link to={props.termsPath}>Terms of Service</Link> and{" "}
              <Link to={props.privacyPolicyPath}>Privacy Policy</Link>.
            </div>
          )}

          {props.signinText}
          <Link to={props.signinPath} className="ml-2">
            {props.signinAction}
          </Link>
        </>
      )}

      {props.type === "signin" && (
        <>
          <Link to={props.signupPath}>{props.signupAction}</Link>

          {props.forgotPassAction && (
            <Link to={props.forgotPassPath} className="ml-3">
              {props.forgotPassAction}
            </Link>
          )}
        </>
      )}

      {props.type === "forgotpass" && (
        <>
          {props.signinText}
          <Link to={props.signinPath} className="ml-2">
            {props.signinAction}
          </Link>
        </>
      )}
    </div>
  );
}

export default AuthFooter;
