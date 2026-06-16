"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controler_1 = require("../controllers/auth.controler");
const router = express_1.default.Router();
router.post("/signup", auth_controler_1.signup);
router.post("/signin", auth_controler_1.signin);
router.post("/forgot-password", auth_controler_1.forgotPassword);
router.post("/reset-password", auth_controler_1.resetPassword);
router.post("/verify-otp", auth_controler_1.verifyOtp);
exports.default = router;
