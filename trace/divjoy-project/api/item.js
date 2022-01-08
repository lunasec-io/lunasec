const express = require("express");
const requireAuth = require("./_require-auth.js");
const {
  getItem,
  getItemsByOwner,
  createItem,
  updateItem,
  deleteItem,
} = require("./_db.js");
const router = express.Router();

router.get("/:id", requireAuth, async (req, res) => {
  const authUser = req.user;
  const { id } = req.params;

  const item = await getItem(id);

  if (!item) {
    return res.send({
      status: "error",
      message: "Item does not exist",
    });
  }

  // Make sure authenticated user is the item owner
  if (item.owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot fetch an item that you don't own",
    });
  }

  res.send({
    status: "success",
    data: item,
  });
});

router.patch("/:id", requireAuth, async (req, res) => {
  const authUser = req.user;
  const body = req.body;
  const { id } = req.params;

  const fetchedItem = await getItem(id);

  if (!fetchedItem) {
    return res.send({
      status: "error",
      message: "Item does not exist",
    });
  }

  // Make sure authenticated user is the item owner
  if (fetchedItem.owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot update an item that you don't own",
    });
  }

  await updateItem(id, body);

  res.send({
    status: "success",
  });
});

router.post("/", requireAuth, async (req, res) => {
  const authUser = req.user;
  const body = req.body;

  // Make sure authenticated user is not setting someone else as the owner
  if (body.owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "You can only set yourself as the item owner",
    });
  }

  const item = await createItem(body);

  res.send({
    status: "success",
    data: item,
  });
});

router.delete("/:id", requireAuth, async (req, res) => {
  const authUser = req.user;
  const { id } = req.params;

  const fetchedItem = await getItem(id);

  if (!fetchedItem) {
    return res.send({
      status: "error",
      message: "Item does not exist",
    });
  }

  // Make sure authenticated user is the item owner
  if (fetchedItem.owner !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot delete an item that you don't own",
    });
  }

  await deleteItem(id);

  res.send({
    status: "success",
  });
});

module.exports = router;
