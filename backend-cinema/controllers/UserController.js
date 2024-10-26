import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../modules/UserSchema.js";
export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
      imgUrl: req.body.imgUrl,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "password123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot registration",
    });
  }
};
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Email or password is wrong",
      });
    }
    const validPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!validPass) {
      return res.status(404).json({
        message: "Email or password is wrong",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "password123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot login",
    });
  }
};
export const authMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Authorization impossible",
    });
  }
};
