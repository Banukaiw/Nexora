import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Additem from "./components/Additem";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyOtp from "./components/VeifyOtp";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/log" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/fogpass" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Additem />} />
          <Route path="/about" element={<About />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;