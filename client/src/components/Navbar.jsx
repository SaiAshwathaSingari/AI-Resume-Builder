import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = { name: "John Doe" };
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  return (
    <nav className="w-full h-20 bg-[#F3EFE6] flex items-center justify-between px-10 border-b border-black/10">
      {/* Left - Custom Logo */}
      <div className="flex items-center">
        {/* Eye Icon (SVG) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-[#1F3D2B]"
          viewBox="0 0 16 16"
          fill="none"
        >
          {/* Outer eye shape (stroke) */}
          <path
            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Iris (filled) */}
          <path
            d="M8 5.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z"
            fill="currentColor"
          />
          {/* Small highlight in the eye */}
          <circle cx="9" cy="7" r="0.5" fill="#fff" />
        </svg>

        {/* Brand Text (C Vision) */}
        <div className="flex items-baseline ml-2">
          <span
            className="text-4xl font-bold text-[#1F3D2B] italic"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            C
          </span>
          <span
            className="text-2xl font-medium text-[#1F3D2B] italic ml-1"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            Vision
          </span>
        </div>
      </div>

      {/* Right - User Pill (unchanged) */}
      <div className="flex items-center gap-5 bg-white px-6 py-3 rounded-full shadow-sm">
        <span className="text-sm font-medium text-[#1F3D2B]">
          Hi, {user.name}
        </span>
        <button
          onClick={logout}
          className="text-sm font-medium text-[#1F3D2B] hover:opacity-70 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
