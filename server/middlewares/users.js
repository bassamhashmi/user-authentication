const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const auth_token = req.headers.auth_token;

    const user = jwt.verify(auth_token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      message: "auth_token ==> Verification Failed!",
      error: error,
    });
  }
};

module.exports = { verifyJWT };
