import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminModel from "../models/Admin.js";

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  adminModel
    .findOne({ username })
    .then((admin) => {
      if (!admin) {
        return res.status(400).send("Invalid username");
      }
      const exist = bcrypt.compare(password, admin.password);
      if (!exist) return res.status(400).send("Invalid password");
      const token = jwt.sign({ _id: admin.id }, process.env.TOKEN_SECRET);
      admin.token = token;
      res.cookie("token-auth", token, { maxAge: 900000, httpOnly: true });
      res.cookie("username", username, { maxAge: 900000, httpOnly: true });
      res.send({message:`Welcome ${username} `,token});
      // res.render("login");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal server error");
    });
};

export default login;
