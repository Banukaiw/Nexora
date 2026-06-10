import { Request, Response } from "express";
import bcrypt from "bcrypt";
import EmployeeModel from "../models/Employee";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const signup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await EmployeeModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await EmployeeModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const signin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check whether user exists
    const user = await EmployeeModel.findOne({ email });

    if (!user || !user.password) {
      res.status(404).json({
        success: false,
        message: "User not found or missing password",
      });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "5m",
      }
    );

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    // 1. Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    console.log("Reset Link:", resetLink);

    // 2. Generate 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Expire after 5 minutes
    const otpExpires = new Date(
      Date.now() + 5 * 60 * 1000
    );

    user.otp = otp;
    user.otpExpires = otpExpires;

    // 3. Save to database once
    await user.save();

    // 4. Send a single response containing the OTP
    res.status(200).json({
      success: true,
      message: "Reset link and OTP generated. Check console.",
      otp, // only for development
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const verifyOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    const user = await EmployeeModel.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (user.otp !== otp) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    if (
      !user.otpExpires ||
      user.otpExpires < new Date()
    ) {
      res.status(400).json({
        success: false,
        message: "OTP expired",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "OTP verified",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await EmployeeModel.findOne({
      email,
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.otp = "";
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};