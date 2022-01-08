import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import { useAuth } from "./../util/auth";
import "./AuthSocial.scss";

function AuthSocial(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(null);
  const [lastUsed, setLastUsed] = useState(null);

  const providerDisplayNames = {
    google: "Google",
    facebook: "Facebook",
    twitter: "Twitter",
    github: "GitHub",
  };

  const onSigninWithProvider = (provider) => {
    setPending(provider);
    auth
      .signinWithProvider(provider)
      .then((user) => {
        localStorage.setItem("lastUsedAuthProvider", provider);
        props.onAuth(user);
      })
      .catch((error) => {
        setPending(null);
        props.onError(error.message);
      });
  };

  // Get value of last used auth provider
  useEffect(() => {
    if (props.showLastUsed) {
      const lastUsed = window.localStorage.getItem("lastUsedAuthProvider");
      if (lastUsed) {
        setLastUsed(lastUsed);
      }
    }
  }, [props.showLastUsed]);

  return (
    <>
      {props.providers.map((provider) => (
        <Button
          variant="light"
          size="lg"
          block={true}
          onClick={() => {
            onSigninWithProvider(provider);
          }}
          className="position-relative"
          key={provider}
        >
          <div className="AuthSocial__icon">
            <img
              src={`https://uploads.divjoy.com/icon-${provider}.svg`}
              alt={providerDisplayNames[provider]}
            />
          </div>

          {pending !== provider && (
            <span>
              {props.buttonAction} with {providerDisplayNames[provider]}
            </span>
          )}

          {pending === provider && (
            <Spinner
              animation="border"
              size="sm"
              role="status"
              aria-hidden={true}
              className="align-baseline text-primary"
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}

          {provider === lastUsed && (
            <Badge
              variant="warning"
              className="position-absolute font-weight-normal"
              style={{
                top: "-6px",
                right: "-6px",
                opacity: 0.7,
              }}
            >
              Last used
            </Badge>
          )}
        </Button>
      ))}
    </>
  );
}

export default AuthSocial;
