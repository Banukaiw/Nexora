import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        { email }
      );

      
     /*   alert(JSON.stringify(res.data)); */
      alert(`OTP: ${res.data.otp}`);
      setMessage("OTP sent successfully");
      setIsSuccess(true);

      navigate(`/verify-otp?email=${email}`);
      /* setMessage(res.data.message);
      setIsSuccess(true); */
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error");
      setIsSuccess(false);
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18V8H3v8z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-white">
            Forgot <span className="text-indigo-400">Password</span>
          </h1>

          <p className="mt-1 mb-4 text-sm text-zinc-400">
            Enter your email to receive an OTP
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 border bg-zinc-900 border-zinc-800 rounded-2xl">

            {message && (
              <div
                className={`p-3 text-sm text-center rounded-xl border ${isSuccess
                    ? "text-green-400 bg-green-950/30 border-green-900/50"
                    : "text-red-400 bg-red-950/30 border-red-900/50"
                  }`}
              >
                {message}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-zinc-300">
                Email
              </label>

              <input
                type="email"
                placeholder="xxx@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-xl py-2.5 text-sm transition active:scale-95"
            >
              Send OTP
            </button>

          </div>
        </form>

        {/* Footer */}
        <p className="mt-5 text-sm text-center text-zinc-500">
          Remember your password?
          <a
            href="/log"
            className="font-medium text-indigo-400 no-underline transition hover:text-indigo-300"
          >
            {" "}
            Sign In
          </a>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;