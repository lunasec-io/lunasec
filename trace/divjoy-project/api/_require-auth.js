const fakeAuth = require("fake-auth");

// Middleware for requiring authentication and getting user
const requireAuth = async (req, res, next) => {
  // Respond with error if no authorization header
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "error",
      message: "You must be signed in to call this endpoint",
    });
  }

  // Get access token from authorization header ("Bearer: xxxxxxx")
  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    // Get user from token and add to `req` object
    req.user = fakeAuth.verifyAccessToken(accessToken);

    // Call route function passed into this middleware
    return next();
  } catch (error) {
    console.log("_require-auth error", error);

    // If there's an error assume token is expired and return
    // auth/invalid-user-token error (handled by apiRequest in util.js)
    res.status(401).send({
      status: "error",
      code: "auth/invalid-user-token",
      message: "Your login has expired. Please login again.",
    });
  }
};

module.exports = requireAuth;
