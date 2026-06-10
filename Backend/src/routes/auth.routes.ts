import express from "express";
import { signup, signin, forgotPassword, resetPassword, verifyOtp } from "../controllers/auth.controler";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-otp", verifyOtp);

export default router;

