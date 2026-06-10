import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="px-6 py-3 text-white bg-[#0a0a0f] font-poppins">
      <div className="flex items-center justify-between ">
        <h1 className="ml-6 text-3xl font-bold text-indigo-500"><Link to="/home" className="text-indigo-500 no-underline ">Nexora</Link></h1>

        <ul className="items-center justify-center hidden gap-6 md:flex">
          <li className="cursor-pointer hover:text-gray-400"><Link to="/home" className="text-white no-underline text-decoration">Home</Link></li>
          <li className="cursor-pointer hover:text-gray-400"><Link to="/About" className="text-white no-underline text-decoration">About</Link></li>
          <li className="cursor-pointer hover:text-gray-400">Services</li>
          <li className="cursor-pointer hover:text-gray-400">Contact</li>
          <button className="px-4 py-2 font-semibold text-white transition bg-indigo-500 rounded-lg hover:bg-indigo-600">
            <Link to="/reg" className="text-white no-underline">
              Sign Up
            </Link>
            <div></div>
            <div></div>
          </button>
        </ul>
        

        <button
          className="text-2xl md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-3 mt-4 md:hidden">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Contact</span>
          <span>Contacyt</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;