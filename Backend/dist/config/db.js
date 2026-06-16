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
const mongoose_1 = __importDefault(require("mongoose"));
const dns_1 = __importDefault(require("dns"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Set fallback public DNS servers to resolve MongoDB SRV records
        // This works around Node.js c-ares DNS resolution issues on some local routers/ISPs
        try {
            dns_1.default.setServers(["8.8.8.8", "1.1.1.1"]);
        }
        catch (dnsError) {
            console.warn("⚠️ DNS configuration warning:", dnsError);
        }
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB Connected");
    }
    catch (error) {
        console.error("❌ MongoDB Error:", error);
        process.exit(1);
    }
});
exports.default = connectDB;
