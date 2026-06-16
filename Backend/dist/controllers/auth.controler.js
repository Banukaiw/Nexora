"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOtp = exports.forgotPassword = exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Employee_1 = __importDefault(require("../models/Employee"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield Employee_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "Email already exists",
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield Employee_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check whether user exists
        const user = yield Employee_1.default.findOne({ email });
        if (!user || !user.password) {
            res.status(404).json({
                success: false,
                message: "User not found or missing password",
            });
            return;
        }
        // Compare password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "5m",
        });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.signin = signin;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield Employee_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        // 1. Generate Reset Token
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        console.log("Reset Link:", resetLink);
        // 2. Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Expire after 5 minutes
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        user.otp = otp;
        user.otpExpires = otpExpires;
        // 3. Save to database once
        yield user.save();
        // 4. Send a single response containing the OTP
        res.status(200).json({
            success: true,
            message: "Reset link and OTP generated. Check console.",
            otp, // only for development
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.forgotPassword = forgotPassword;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        const user = yield Employee_1.default.findOne({
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
        if (!user.otpExpires ||
            user.otpExpires < new Date()) {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.verifyOtp = verifyOtp;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Employee_1.default.findOne({
            email,
        });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        user.password = hashedPassword;
        user.otp = "";
        user.otpExpires = undefined;
        yield user.save();
        res.status(200).json({
            success: true,
            message: "Password updated",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.resetPassword = resetPassword;
