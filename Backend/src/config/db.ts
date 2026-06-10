import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    // Set fallback public DNS servers to resolve MongoDB SRV records
    // This works around Node.js c-ares DNS resolution issues on some local routers/ISPs
    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (dnsError) {
      console.warn("⚠️ DNS configuration warning:", dnsError);
    }

    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    process.exit(1);
  }
};

export default connectDB;