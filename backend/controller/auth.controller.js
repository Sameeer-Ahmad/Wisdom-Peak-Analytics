const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Blacklist } = require("../model/blacklist.model");
require("dotenv").config();
const validator = require("validator");


// Registers a new user with hashed password.
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ msg: "Please provide username, email, and password" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send({ msg: "Invalid email format" });
  }
  try {
    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).send({ msg: `user registered successfully`, user });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Unable to signup", error: error.message });
  }
};

// Authenticates user and generates JWT on successful login.
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send({ msg: "Invalid email format" });
  }
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: "Invalid Password" });
    }
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "12h",
      }
    );
    return res.status(200).send({ messege: "Login successful", accessToken });
  } catch (error) {
    res.status(500).send({ msg: "Unable to login", error: error.message });
  }
};

// Logs out user by blacklisting the JWT.
const logout = async (req, res) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).send({ msg: "Authorization header missing" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    res.status(401).send("token not provided");
  }
  try {
    const userToken = new Blacklist({ token });
    await userToken.save();
    return res.status(201).send({ msg: "User logout Successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Unable to logout", error: error.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
