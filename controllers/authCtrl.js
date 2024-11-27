import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUserCtrl = async (req, res, next) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(password, salt);
    const newUser = new userModel({ email, password: passHash, role });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    next(error);
  }
};
// Login User
export const loginUserCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      success: false,
      message: "Please enter email and password",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set the token in a cookie (httpOnly and secure flags)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUserCtrl = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
