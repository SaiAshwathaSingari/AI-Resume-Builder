import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // Added for a more premium feel

function Navbar() {
  const user = { name: "John Doe" };
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  return (
    <nav className="w-full h-20 bg-[#F3EFE6] flex items-center justify-between px-10 border-b border-black/10">
      
      {/* --- LEFT: BRAND LOGO --- */}
      <div className="flex items-center group cursor-pointer" onClick={() => navigate("/app")}>
        <div className="relative flex items-center justify-center">
          {/* Refined Modern Eye Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-[#1F3D2B] transition-transform duration-500 group-hover:rotate-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8" // Increased thickness for better visibility
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer Eye - Modern curved path */}
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            {/* Iris - Double ring effect */}
            <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.1" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
          
          {/* Subtle Glow Effect on Hover */}
          <div className="absolute inset-0 bg-[#1F3D2B]/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Brand Text - Professional Serif Style */}
        <div className="flex flex-col ml-3 leading-tight">
          <div className="flex items-center">
            <span className="text-2xl font-serif font-bold text-[#1F3D2B] tracking-tight">
              C
            </span>
            <span className="text-2xl font-serif font-light text-[#1F3D2B] tracking-tight ml-0.5">
              Vision
            </span>
          </div>
          {/* Tagline or thin border for extra polish */}
          <div className="h-[1px] w-full bg-[#1F3D2B]/20 mt-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </div>
      </div>

      {/* --- RIGHT: USER PILL --- */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-black/5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
          <div className="w-7 h-7 rounded-full bg-[#1F3D2B] flex items-center justify-center text-[10px] font-bold text-white uppercase">
            {user.name.charAt(0)}
          </div>
          <span className="text-xs font-bold text-[#1F3D2B] uppercase tracking-wider">
            {user.name}
          </span>
          <div className="w-[1px] h-4 bg-black/10 mx-1" />
          <button
            onClick={logout}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-600/70 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;