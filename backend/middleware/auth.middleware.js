const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
require("dotenv").config();
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (decoded) {
        const { userID, username, role } = decoded;
        const user = await userModel.findById(userID);
        req.user = user;
        req.body.userID = userID;
        next();
      } else {
        console.log(err);
        res.status(400).send("Invalid token");
      }
    });
  } else {
    res.status(401).send("Token not provided");
  }
};
module.exports = {
  auth,
};
