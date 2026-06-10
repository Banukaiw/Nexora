import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    axios.post('http://localhost:8080/api/auth/signup', { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/log");
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message)
        } else {
          setError("Registration failed. Please try again.");
        }
      });
  }
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-950">
      <div className="w-full max-w-sm">

        {/* Logo / Title */}

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-indigo-500 rounded-2xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">Create Account</h2>
          <p className="mt-1 text-sm text-zinc-400">Sign up to get started</p>
        </div>

        {/* Card */}
        <div className="p-6 space-y-4 border bg-zinc-900 border-zinc-800 rounded-2xl">

          {error && (
            <div className="p-3 text-sm text-center text-red-400 border bg-red-950/30 border-red-900/50 rounded-xl">
              {error}
            </div>
          )}

          {/* Name */}
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                required
                placeholder="Enter your name"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                required
                placeholder="you@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-zinc-300 text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                required
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-xl py-2.5 text-sm transition active:scale-95 mt-3"
            >
              Register
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-5 text-sm text-center text-zinc-500">
          Already have an account?{" "}
          <Link to="/log" className="font-medium text-indigo-400 transition hover:text-indigo-300 ">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
