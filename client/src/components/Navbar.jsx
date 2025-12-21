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
      
      {/* Left - Decorative Premium Logo */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-2">
          {/* Left dot */}
          <span className="text-2xl text-[#1F3D2B]/40">•</span>

          {/* Logo text */}
          <div className="flex items-baseline">
            <span className="text-4xl font-semibold text-[#1F3D2B] tracking-tight">
              C
            </span>
            <span className="text-3xl font-medium italic text-[#1F3D2B] ml-1">
              Vision
            </span>
          </div>

          {/* Right dot */}
          <span className="text-2xl text-[#1F3D2B]/40">•</span>
        </div>

        {/* soft wave accent */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#1F3D2B]/30 text-sm">~</span>
          <div className="flex-1 h-[3px] bg-[#1F3D2B]/20 rounded-full"></div>
          <span className="text-[#1F3D2B]/30 text-sm">~</span>
        </div>
      </div>

      {/* Right - User pill */}
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
