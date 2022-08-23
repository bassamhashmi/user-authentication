const UsersModel = require("../models/users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
    POST | Create New User
*/
const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).json({ message: "Enter details correctly" });
      return;
    }

    const hash = bcrypt.hashSync(password, 10);

    const newUser = await UsersModel.create({
      fullName,
      email,
      password: hash,
    });

    res.status(200).json({ success: true, newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*
    POST | find user and check email and password
*/
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Enter details correctly" });
      return;
    }
    const user = await UsersModel.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({ message: "User does not exist!" });
      return;
    }

    const validate = bcrypt.compareSync(password, user.password);

    if (!validate) {
      res
        .status(400)
        .json({ success: false, message: "Password is incorrect!" });
      return;
    }

    // Generating JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ success: true, validate, token, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { signIn, signUp };
