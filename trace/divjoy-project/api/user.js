const express = require("express");
const requireAuth = require("./_require-auth.js");
const { getUser, createUser, updateUser } = require("./_db.js");
const router = express.Router();

router.get("/:uid", requireAuth, async (req, res) => {
  const authUser = req.user;
  const { uid } = req.params;

  // Prevent access to user other than yourself
  // Note: You may want to remove this depending on your needs
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot access user other than yourself",
    });
  }

  const user = await getUser(uid);

  res.send({
    status: "success",
    data: user,
  });
});

router.patch("/:uid", requireAuth, async (req, res) => {
  const authUser = req.user;
  const body = req.body;
  const { uid } = req.params;

  // Make sure authenticated user can only update themself
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot update user other than yourself",
    });
  }

  await updateUser(uid, body);

  res.send({
    status: "success",
  });
});

router.post("/", requireAuth, async (req, res) => {
  const authUser = req.user;
  const body = req.body;

  // Make sure authenticated user can only create themself in the database
  if (body.uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Created user must have the same uid as authenticated user",
    });
  }

  await createUser(body.uid, body);

  res.send({
    status: "success",
  });
});

module.exports = router;
