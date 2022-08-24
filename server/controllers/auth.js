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

    const validate = bcrypt.compareSync(req.body.password, user.password);

    if (!validate) {
      res
        .status(400)
        .json({ success: false, message: "Password is incorrect!" });
      return;
    }

    // Generating JWT ==> auth_token
    const auth_token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: 21600,
    });

    res.status(200).json({ success: true, validate, auth_token, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*
    GET | User Data
*/
const getUserData = async (req, res) => {
  try {
    const userData = await UsersModel.findOne({ email: req.user.email });

    res.status(200).json({ authorized: true, userData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*
    GET | All Users Data
*/
const getAllUsers = async (req, res) => {
  try {
    const usersData = await UsersModel.find();

    res.status(200).json(usersData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

module.exports = { signIn, signUp, getUserData, getAllUsers };
