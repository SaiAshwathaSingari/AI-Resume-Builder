import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice.js";

function Navbar() {
  const user1 = useSelector(state => state.auth);
  const user = { name: user1.user.name };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="w-full h-24 bg-[#F3EFE6] flex items-center justify-between px-12 border-b border-[#1F3D2B]/10">
      
      {/* --- LEFT: BIG POSH LOGO --- */}
      <div 
        className="flex flex-col cursor-pointer group select-none" 
        onClick={() => navigate("/")}
      >
        <div className="flex items-baseline">
          {/* The Large Serif 'C' */}
          <span 
            className="text-6xl text-[#1F3D2B] leading-none transition-transform duration-500 group-hover:-translate-y-1"
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontWeight: "700",
              fontStyle: "italic",
              letterSpacing: "-0.05em"
            }}
          >
            C
          </span>
          
          {/* The Elegant Cursive 'Vision' */}
          <span 
            className="text-4xl text-[#1F3D2B] -ml-2 transition-all duration-500 group-hover:translate-x-1"
            style={{ 
              fontFamily: "'Dancing Script', cursive", 
              fontWeight: "400",
              letterSpacing: "0.02em"
            }}
          >
            Vision
          </span>
        </div>
        
        {/* Posh Accent Line */}
        <div className="flex items-center gap-2 mt-[-4px] ml-1">
          <div className="h-[1.5px] w-12 bg-[#1F3D2B] transition-all duration-700 group-hover:w-24" />
          <div className="h-1 w-1 rounded-full bg-[#1F3D2B]" />
        </div>
      </div>

      {/* --- RIGHT: USER PROFILE --- */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#1F3D2B]/5 shadow-sm">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-black text-[#1F3D2B] uppercase tracking-[0.2em] leading-tight">
              {user.name}
            </span>
            <button
              onClick={logoutUser}
              className="text-[10px] font-bold text-red-600/60 hover:text-red-600 transition-colors uppercase tracking-widest mt-1"
            >
              Log Out
            </button>
          </div>
          
          {/* Minimalist Profile Initials */}
          <div className="w-10 h-10 rounded-full bg-[#1F3D2B] text-white flex items-center justify-center text-xs font-serif italic shadow-md">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&family=Playfair+Display:ital,wght@1,700&display=swap');
      `}</style>
    </nav>
  );
}

export default Navbar;
