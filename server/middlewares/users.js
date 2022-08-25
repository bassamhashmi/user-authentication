const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const auth_token = req.headers.auth_token;

    const user = jwt.verify(auth_token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (error) {
    res.status(403).json({
      message: "auth_token ==> Verification Failed!",
      error: error,
    });
  }
};

const militaryTypeSecurity = (req, res, next) => {
  console.log(req.headers.x_api_key);

  if (req.headers.x_api_key === process.env.x_api_key) {
    next();
    return;
  }

  res.status(400).json("notAuthorized");
};

module.exports = { verifyJWT, militaryTypeSecurity };
