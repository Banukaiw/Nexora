import React, { useState } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  /* const { token } = useParams(); */
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email =
    new URLSearchParams(location.search).get(
      "email"
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/auth/reset-password`,
        { email, password }
      );

      setMessage(res.data.message);
      setIsSuccess(true)
      setTimeout(() => {
        navigate("/log");
      }, 2000);
    } catch (error: any) {
      setIsSuccess(false)
      setMessage(error.response?.data?.message || "Error resetting password")
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
              d="M12 15v2m6-6a6 6 0 10-12 0v2a2 2 0 01-.586 1.414L4 16v1h16v-1l-1.414-1.586A2 2 0 0118 13v-2z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-white">
          Reset <span className="text-indigo-400">Password</span>
        </h1>

        <p className="mt-1 mb-4 text-sm text-zinc-400">
          Create a new secure password
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 border bg-zinc-900 border-zinc-800 rounded-2xl">

          {message && (
            <div
              className={`p-3 text-sm text-center rounded-xl border ${
                isSuccess
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
              type="text"
              value={email || ""}
              readOnly
              className="w-full px-4 py-2.5 text-sm text-zinc-400 border rounded-xl bg-zinc-800 border-zinc-700 cursor-not-allowed"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-300">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-xl py-2.5 text-sm transition active:scale-95"
          >
            Reset Password
          </button>

        </div>
      </form>

    </div>
  </div>
);
};

export default ResetPassword;