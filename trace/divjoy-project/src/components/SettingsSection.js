import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Section from "./Section";
import ReauthModal from "./ReauthModal";
import SettingsNav from "./SettingsNav";
import FormAlert from "./FormAlert";
import SettingsGeneral from "./SettingsGeneral";
import SettingsPassword from "./SettingsPassword";
import SettingsBilling from "./SettingsBilling";
import { useAuth } from "./../util/auth";

function SettingsSection(props) {
  const auth = useAuth();
  const [formAlert, setFormAlert] = useState(null);

  // State to control whether we show a re-authentication flow
  // Required by some security sensitive actions, such as changing password.
  const [reauthState, setReauthState] = useState({
    show: false,
  });

  const validSections = {
    general: true,
    password: true,
    billing: true,
  };

  const section = validSections[props.section] ? props.section : "general";

  // Handle status of type "success", "error", or "requires-recent-login"
  // We don't treat "requires-recent-login" as an error as we handle it
  // gracefully by taking the user through a re-authentication flow.
  const handleStatus = ({ type, message, callback }) => {
    if (type === "requires-recent-login") {
      // First clear any existing message
      setFormAlert(null);
      // Then update state to show re-authentication modal
      setReauthState({
        show: true,
        // Failed action to try again after reauth
        callback: callback,
      });
    } else {
      // Display message to user (type is success or error)
      setFormAlert({
        type: type,
        message: message,
      });
    }
  };

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      {reauthState.show && (
        <ReauthModal
          callback={reauthState.callback}
          provider={auth.user.providers[0]}
          onDone={() => setReauthState({ show: false })}
        />
      )}

      <SettingsNav activeKey={section} className="justify-content-center" />
      <Container
        className="mt-5"
        style={{
          maxWidth: "450px",
        }}
      >
        {formAlert && (
          <FormAlert
            type={formAlert.type}
            message={formAlert.message}
            className="mx-auto mb-4"
            style={{ maxWidth: "450px" }}
          />
        )}

        {section === "general" && <SettingsGeneral onStatus={handleStatus} />}

        {section === "password" && <SettingsPassword onStatus={handleStatus} />}

        {section === "billing" && <SettingsBilling onStatus={handleStatus} />}
      </Container>
    </Section>
  );
}

export default SettingsSection;
