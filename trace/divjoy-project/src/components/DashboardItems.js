import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import FormAlert from "./FormAlert";
import EditItemModal from "./EditItemModal";
import { useAuth } from "./../util/auth";
import { updateItem, deleteItem, useItemsByOwner } from "./../util/db";
import "./DashboardItems.scss";

function DashboardItems(props) {
  const auth = useAuth();

  const {
    data: items,
    status: itemsStatus,
    error: itemsError,
  } = useItemsByOwner(auth.user.uid);

  const [creatingItem, setCreatingItem] = useState(false);

  const [updatingItemId, setUpdatingItemId] = useState(null);

  const itemsAreEmpty = !items || items.length === 0;

  const canUseStar =
    auth.user.planIsActive &&
    (auth.user.planId === "pro" || auth.user.planId === "business");

  const handleStarItem = (item) => {
    if (canUseStar) {
      updateItem(item.id, { featured: !item.featured });
    } else {
      alert("You must upgrade to the pro or business plan to use this feature");
    }
  };

  return (
    <>
      {itemsError && (
        <div className="mb-3">
          <FormAlert type="error" message={itemsError.message} />
        </div>
      )}

      <div className="DashboardItems__card-items-wrapper">
        <Card className="card-items">
          <Card.Header
            as="h5"
            className="d-flex justify-content-between align-items-center"
          >
            Items
            <Button
              variant="primary"
              size="md"
              onClick={() => setCreatingItem(true)}
            >
              Add Item
            </Button>
          </Card.Header>

          {(itemsStatus === "loading" || itemsAreEmpty) && (
            <div className="py-5 px-3 align-self-center">
              {itemsStatus === "loading" && (
                <Spinner animation="border" variant="primary">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}

              {itemsStatus !== "loading" && itemsAreEmpty && (
                <>Nothing yet. Click the button to add your first item.</>
              )}
            </div>
          )}

          {itemsStatus !== "loading" && items && items.length > 0 && (
            <ListGroup variant="flush">
              {items.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className={
                    `d-flex justify-content-between align-items-center` +
                    (item.featured ? " featured" : "")
                  }
                >
                  {item.name}
                  <div>
                    <Button
                      variant="link"
                      aria-label="star"
                      onClick={() => handleStarItem(item)}
                      className={
                        `action` + (item.featured ? ` star-featured` : "")
                      }
                    >
                      <i className="fas fa-star" />
                    </Button>
                    <Button
                      variant="link"
                      aria-label="update"
                      onClick={() => setUpdatingItemId(item.id)}
                      className="action"
                    >
                      <i className="fas fa-edit" />
                    </Button>
                    <Button
                      variant="link"
                      aria-label="delete"
                      onClick={() => deleteItem(item.id)}
                      className="action"
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card>
      </div>

      {creatingItem && <EditItemModal onDone={() => setCreatingItem(false)} />}

      {updatingItemId && (
        <EditItemModal
          id={updatingItemId}
          onDone={() => setUpdatingItemId(null)}
        />
      )}
    </>
  );
}

export default DashboardItems;
