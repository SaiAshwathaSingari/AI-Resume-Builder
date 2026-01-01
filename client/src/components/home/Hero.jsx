import { useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      className={`bg-gradient-to-b px-3 sm:px-10 from-[#F5F7FF] via-[#fffbee] to-[#E6EFFF] pt-6 h-full ${
        menuOpen ? "overflow-hidden" : ""
      }`}
    >
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-3 md:py-4 shadow-sm max-w-5xl rounded-full mx-auto w-full bg-white">
        

        {/* NAV */}
        <nav
          className={`max-md:absolute max-md:top-0 max-md:left-0 items-center justify-center max-md:h-full transition-[width] bg-white/50 backdrop-blur flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal ${
            menuOpen ? "max-md:w-full" : "max-md:w-0 overflow-hidden"
          }`}
        >
          <Link to='/app?state=register' className="hover:text-indigo-600" >Get Started</Link>
          <a className="hover:text-indigo-600" >Customer Stories</a>
          <a className="hover:text-indigo-600" >Get</a>
          <Link to='/app?state=login' className="hover:text-indigo-600" >Login</Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center space-x-4">
          <button className="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-slate-300 rounded-md">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M7.5 10.39a2.889 2.889 0 1 0 0-5.779 2.889 2.889 0 0 0 0 5.778M7.5 1v.722m0 11.556V14M1 7.5h.722m11.556 0h.723m-1.904-4.596-.511.51m-8.172 8.171-.51.511m-.001-9.192.51.51m8.173 8.171.51.511"
                stroke="#353535"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Link to='/login' className="hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition">
            Sign up
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* HERO CONTENT */}
      <main className="flex-grow flex flex-col items-center max-w-7xl mx-auto w-full">
        <button className="mt-16 mb-6 flex items-center space-x-2 border border-indigo-600 text-indigo-600 text-xs rounded-full px-4 pr-1.5 py-1.5 hover:bg-indigo-50 transition">
          <span>Explore how we help grow brands.</span>
          <span className="flex items-center justify-center size-6 p-1 rounded-full bg-indigo-600">
            <svg width="14" height="11" viewBox="0 0 16 13" fill="none">
              <path d="M1 6.5h14M9.5 1 15 6.5 9.5 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <h1 className="text-center text-gray-900 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight">
          Preferred choice of leaders in{" "}
          <span className="text-indigo-600">every industry</span>
        </h1>

        <p className="mt-4 text-center text-gray-600 max-w-md text-sm sm:text-base leading-relaxed">
          Learn why professionals trust our solution to complete their customer journey.
        </p>

        <button className="mt-8 bg-indigo-600 text-white px-6 pr-2.5 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-indigo-700 transition">
          <span>Read Success Stories</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* IMAGES */}
        <div className="mt-12 flex max-md:overflow-x-auto gap-6 max-w-4xl w-full pb-6">
          {[
            "https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?q=80&w=735",
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687",
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687",
            "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687",
            "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=764",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-36 h-44 hover:-translate-y-1 transition duration-300 rounded-lg object-cover flex-shrink-0"
            />
          ))}
        </div>
      </main>
    </section>
  );
}
