import React from "react";
import Container from "react-bootstrap/Container";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Auth from "./Auth";
import AuthFooter from "./AuthFooter";

function AuthSection(props) {
  // Options by auth type
  const optionsByType = {
    signup: {
      // Top Title
      title: "Get yourself an account",
      // Button text
      buttonAction: "Sign up",
      // Footer text and links
      showFooter: true,
      signinText: "Already have an account?",
      signinAction: "Sign in",
      signinPath: "/auth/signin",
      // Terms and privacy policy agreement
      showAgreement: true,
      termsPath: "/legal/terms-of-service",
      privacyPolicyPath: "/legal/privacy-policy",
    },
    signin: {
      title: "Welcome back",
      buttonAction: "Sign in",
      showFooter: true,
      signupAction: "Create an account",
      signupPath: "/auth/signup",
      forgotPassAction: "Forgot Password?",
      forgotPassPath: "/auth/forgotpass",
    },
    forgotpass: {
      title: "Get a new password",
      buttonAction: "Reset password",
      showFooter: true,
      signinText: "Remember it after all?",
      signinAction: "Sign in",
      signinPath: "/auth/signin",
    },
    changepass: {
      title: "Choose a new password",
      buttonAction: "Change password",
    },
  };

  // Ensure we have a valid auth type
  const type = optionsByType[props.type] ? props.type : "signup";

  // Get options object for current auth type
  const options = optionsByType[type];

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container
        style={{
          maxWidth: "450px",
        }}
      >
        <SectionHeader
          title={options.title}
          subtitle=""
          size={2}
          spaced={true}
          className="text-center"
        />
        <Auth
          type={type}
          buttonAction={options.buttonAction}
          providers={props.providers}
          afterAuthPath={props.afterAuthPath}
          key={type}
        />

        {options.showFooter && <AuthFooter type={type} {...options} />}
      </Container>
    </Section>
  );
}

export default AuthSection;
