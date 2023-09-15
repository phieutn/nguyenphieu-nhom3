import express from "express";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validation
    if (!username || !password) {
      res.status(400).json({
        message: "Missing required keys",
      });
    }

    // Check authentication
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    };

    // Check password
    const isMatchPassword = (password === existingUser.password);
      if (!isMatchPassword) {
        res.status(401).json({
          message: "Username or password is not correct",
        });
      };

    // Generate token
    const jwtPayload = {
        username: existingUser.username,
      };
  
      const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
        expiresIn: "12h",
      });

      res.json({
        token: token,
        message: "Login Successfully",
      });
    

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default authRouter;