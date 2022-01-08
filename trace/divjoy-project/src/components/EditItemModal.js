import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";
import FormAlert from "./FormAlert";
import FormField from "./FormField";
import { useAuth } from "./../util/auth";
import { useItem, updateItem, createItem } from "./../util/db";

function EditItemModal(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  // This will fetch item if props.id is defined
  // Otherwise query does nothing and we assume
  // we are creating a new item.
  const { data: itemData, status: itemStatus } = useItem(props.id);

  // If we are updating an existing item
  // don't show modal until item data is fetched.
  if (props.id && itemStatus !== "success") {
    return null;
  }

  const onSubmit = (data) => {
    setPending(true);

    const query = props.id
      ? updateItem(props.id, data)
      : createItem({ owner: auth.user.uid, ...data });

    query
      .then(() => {
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
        {props.id && <>Update</>}
        {!props.id && <>Create</>}
        {` `}Item
      </Modal.Header>
      <Modal.Body>
        {formAlert && (
          <FormAlert type={formAlert.type} message={formAlert.message} />
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <FormField
              size="lg"
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={itemData && itemData.name}
              error={errors.name}
              autoFocus={true}
              inputRef={register({
                required: "Please enter a name",
              })}
            />
          </Form.Group>
          <Button size="lg" variant="primary" type="submit" disabled={pending}>
            <span>Save</span>

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
      </Modal.Body>
    </Modal>
  );
}

export default EditItemModal;
