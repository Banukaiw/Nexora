import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if ( !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    setError("");
    axios.post('http://localhost:8080/api/auth/signin', {email, password})
    .then((result) => {
      console.log(result);
      if(result.data.success){
         // Save JWT token
      localStorage.setItem("token", result.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(result.data.user)
      );
        navigate("/home");
      }
    } )
    .catch(err => {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials or server error");
      }
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-zinc-950">
      
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center ">
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-white">
            Welcome back to <span className="text-indigo-400">Nexora</span>
          </h1>
          <p className="mt-0 mb-2 text-sm text-zinc-400">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
                  <div className="p-6 space-y-4 border bg-zinc-900 border-zinc-800 rounded-2xl">
                    
                    {error && (
                      <div className="p-3 text-sm text-center text-red-400 border bg-red-950/30 border-red-900/50 rounded-xl">
                        {error}
                      </div>
                    )}

          {/* Email */}
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              autoComplete="given-name"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="xxx@gmail.com"
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* (Your extra note section - fixed JSX) */}
          

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-zinc-300">
                Password
              </label>
              
              <Link
                to="/fogpass"
                className="text-xs text-indigo-400 no-underline transition hover:text-indigo-300"
              >
                Forgot password?
              </Link>
            </div>

            <input
              type="password"
              placeholder="12345"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Button */}
          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-xl py-2.5 text-sm transition active:scale-95">
            
           Login
          </button>

           
        </div>
        </form>


        {/* Footer */}
        <p className="mt-5 text-sm text-center text-zinc-500">
          Don't have an account?
            <Link to="/reg" className="font-medium text-indigo-400 no-underline transition hover:text-indigo-300"> Sign Up</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;