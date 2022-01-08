import React from "react";
import Form from "react-bootstrap/Form";

function FormField(props) {
  const { error, type, inputRef, ...inputProps } = props;

  return (
    <>
      {props.label && <Form.Label>{props.label}</Form.Label>}

      <Form.Control
        as={type === "textarea" ? "textarea" : "input"}
        type={type === "textarea" ? undefined : type}
        isInvalid={error ? true : undefined}
        ref={inputRef}
        {...inputProps}
      />

      {error && (
        <Form.Control.Feedback type="invalid" className="text-left">
          {error.message}
        </Form.Control.Feedback>
      )}
    </>
  );
}

export default FormField;
