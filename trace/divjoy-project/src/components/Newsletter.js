import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import newsletter from "./../util/newsletter";

function Newsletter(props) {
  const [subscribed, setSubscribed] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = ({ email }) => {
    setSubscribed(true);
    // Parent component can optionally
    // find out when subscribed.
    props.onSubscribed && props.onSubscribed();
    // Subscribe them
    newsletter.subscribe({ email });
  };

  return (
    <>
      {subscribed === false && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Col>
              <FormField
                size="lg"
                name="email"
                type="email"
                placeholder="Email"
                error={errors.email}
                inputRef={register({
                  required: "Please enter an email address",
                })}
              />
            </Col>
            <Col xs="auto">
              <Button variant={props.buttonColor} size="lg" type="submit">
                {props.buttonText}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )}

      {subscribed === true && <div>{props.subscribedMessage}</div>}
    </>
  );
}

export default Newsletter;
