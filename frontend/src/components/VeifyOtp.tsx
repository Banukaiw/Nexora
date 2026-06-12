import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      console.log(res.data);

      setMessage("");

      navigate(`/reset-password?email=${email}`);
    } catch (error: any) {
      console.log(error.response?.data);
      setMessage(
        error.response?.data?.message || "Verification failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-950">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-indigo-500 rounded-2xl">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1Zm0 0V8m8 4c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-white">
            Verify <span className="text-indigo-400">OTP</span>
          </h1>

          <p className="mt-1 mb-4 text-sm text-zinc-400">
            Enter the OTP sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 border bg-zinc-900 border-zinc-800 rounded-2xl">

            {message && (
              <div className="p-3 text-sm text-center text-red-400 border bg-red-950/30 border-red-900/50 rounded-xl">
                {message}
              </div>
            )}

            {/* Email Display */}
            <div>
              <label className="block mb-1 text-sm font-medium text-zinc-300">
                Email
              </label>

              <input
                type="text"
                value={email || ""}
                readOnly
                className="w-full px-4 py-2.5 text-sm text-zinc-400 border rounded-xl bg-zinc-800 border-zinc-700 cursor-not-allowed"
              />
            </div>

            {/* OTP Input */}
            <div>
              <label className="block mb-1 text-sm font-medium text-zinc-300">
                OTP Code
              </label>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full py-2.5 text-sm font-medium text-white transition rounded-xl bg-indigo-500 hover:bg-indigo-400 active:scale-95"
            >
              Verify OTP
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};

export default VerifyOtp;