import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";
import FormAlert from "./FormAlert";
import FormField from "./FormField";
import AuthSocial from "./AuthSocial";
import { useAuth } from "./../util/auth";

function ReauthModal(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { pass } = data;
    setPending(true);

    auth
      .signin(auth.user.email, pass)
      .then(() => {
        // Call failed action that originally required reauth
        props.callback();
        // Let parent know we're done so they can hide modal
        props.onDone();
      })
      .catch((error) => {
        // Hide pending indicator
        setPending(false);
        // Show error alert message
        setFormAlert({
          type: "error",
          message: error.message,
        });
      });
  };

  return (
    <Modal show={true} centered={true} animation={false} onHide={props.onDone}>
      <Modal.Header closeButton={true}>
        Please sign in again to complete this action
      </Modal.Header>
      <Modal.Body>
        {formAlert && (
          <FormAlert type={formAlert.type} message={formAlert.message} />
        )}

        {props.provider === "password" && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formConfirmPass">
              <FormField
                size="lg"
                name="pass"
                type="password"
                placeholder="Password"
                autoFocus={true}
                error={errors.pass}
                inputRef={register({
                  required: "Please enter your password",
                })}
              />
            </Form.Group>
            <Button
              size="lg"
              variant="primary"
              block={true}
              type="submit"
              disabled={pending}
            >
              <span>Submit</span>

              {pending && (
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden={true}
                  className="ml-2"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </Button>
          </Form>
        )}

        {props.provider !== "password" && (
          <AuthSocial
            type="signin"
            buttonText="Sign in"
            providers={[props.provider]}
            showLastUsed={false}
            onAuth={() => {
              props.callback();
              props.onDone();
            }}
            onError={(message) => {
              setFormAlert({
                type: "error",
                message: message,
              });
            }}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ReauthModal;
