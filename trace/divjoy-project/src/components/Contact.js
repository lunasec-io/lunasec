import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import FormAlert from "./FormAlert";
import FormField from "./FormField";
import contact from "./../util/contact";

function Contact(props) {
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const { handleSubmit, register, errors, reset } = useForm();

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);

    contact
      .submit(data)
      .then(() => {
        // Clear form
        reset();
        // Show success alert message
        setFormAlert({
          type: "success",
          message: "Your message has been sent!",
        });
      })
      .catch((error) => {
        // Show error alert message
        setFormAlert({
          type: "error",
          message: error.message,
        });
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <>
      {formAlert && (
        <FormAlert type={formAlert.type} message={formAlert.message} />
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          {props.showNameField && (
            <Form.Group as={Col} xs={12} sm={6} controlId="formName">
              <FormField
                size="lg"
                name="name"
                type="text"
                placeholder="Name"
                error={errors.name}
                inputRef={register({
                  required: "Please enter your name",
                })}
              />
            </Form.Group>
          )}

          <Form.Group
            as={Col}
            xs={12}
            sm={props.showNameField ? 6 : 12}
            controlId="formEmail"
          >
            <FormField
              size="lg"
              name="email"
              type="email"
              placeholder="Email"
              error={errors.email}
              inputRef={register({
                required: "Please enter your email",
              })}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formMessage">
          <FormField
            size="lg"
            name="message"
            type="textarea"
            placeholder="Message"
            rows={5}
            error={errors.message}
            inputRef={register({
              required: "Please enter a message",
            })}
          />
        </Form.Group>
        <Button
          variant={props.buttonColor}
          size="lg"
          type="submit"
          disabled={pending}
        >
          <span>{props.buttonText}</span>

          {pending && (
            <Spinner
              animation="border"
              size="sm"
              role="status"
              aria-hidden={true}
              className="ml-2"
            >
              <span className="sr-only">Sending...</span>
            </Spinner>
          )}
        </Button>
      </Form>
    </>
  );
}

export default Contact;
