import { User } from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    const findUser = await User.findOne({ userEmail: userEmail });
    if (findUser) {
      return res.json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(userPassword, 10);

    const user = new User({
      userName: userName,
      userEmail: userEmail,
      userPassword: hashPassword,
    });

    const saveUser = await user.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { userPassword, userEmail } = req.body;
    const findData = await User.findOne({ userEmail: userEmail });
    if (findData) {
      bcrypt.compare(userPassword, findData.userPassword, (err, result) => {
        if (result) {
          const token = jwt.sign({ findData }, process.env.SECRET_KEY, {
            expiresIn: "12h",
          });
          res.status(201).send({ findData, token });
        } else {
          res.send("Login failure");
        }
      });
    } else {
      res.send("user not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export { createUser, getUser };
