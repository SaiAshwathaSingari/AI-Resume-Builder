import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, MousePointerClick } from 'lucide-react';
import { useSelector } from 'react-redux';

const Home = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state=>state.auth);
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#1F3D2B] selection:bg-[#1F3D2B] selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav className="w-full h-24 flex items-center justify-between px-12 border-b border-[#1F3D2B]/10">
        {/* LOGO EXACTLY AS PROVIDED */}
        <div 
          className="flex flex-col cursor-pointer group select-none" 
          onClick={() => navigate("/")}
        >
          <div className="flex items-baseline">
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
          <div className="flex items-center gap-2 mt-[-4px] ml-1">
            <div className="h-[1.5px] w-12 bg-[#1F3D2B] transition-all duration-700 group-hover:w-24" />
            <div className="h-1 w-1 rounded-full bg-[#1F3D2B]" />
          </div>
        </div>

        <div className="flex items-center gap-8"
          hidden={user}
        >
          <button onClick={() => navigate('/login')} className="text-[11px] font-black uppercase tracking-[0.2em] hover:opacity-60 transition">Login</button>
          <button 
            onClick={() => navigate(user ? '/app':'/login')}
            className="px-10 py-4 bg-[#1F3D2B] text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#1F3D2B]/20 hover:scale-105 transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="px-12 pt-24 pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F3D2B]/5 border border-[#1F3D2B]/10">
            <Sparkles size={14} className="text-[#1F3D2B]" />
            <span className="text-[10px] font-black uppercase tracking-widest">Premium AI Resume Architect</span>
          </div>
          
          <h1 className="text-8xl font-serif font-bold leading-[0.85] tracking-tighter">
            Elevate Your <br />
            <span className="italic font-light">Presence.</span>
          </h1>
          
          <p className="text-xl text-[#1F3D2B]/60 max-w-md font-medium leading-relaxed">
            The bespoke builder for professionals. We don't just generate resumes; we architect your career's visual narrative.
          </p>

          <div className="flex items-center gap-8 pt-4">
            <button 
              onClick={() => navigate('/app')}
              className="group flex items-center gap-4 px-12 py-6 bg-[#1F3D2B] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#1F3D2B]/40 transition-all active:scale-95"
            >
              Start Building <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* Abstract Visual Component */}
        <div className="relative hidden lg:block">
          <div className="w-full aspect-square bg-[#1F3D2B] rounded-[80px] rotate-3 shadow-3xl flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
             <div className="w-3/4 h-5/6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 space-y-6">
                <div className="h-6 w-1/3 bg-white/20 rounded-full" />
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                  <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                </div>
                <div className="h-40 w-full bg-[#F3EFE6]/5 rounded-[32px] mt-12 border border-white/5" />
             </div>
          </div>
          {/* Decorative floating badge */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#F3EFE6] border border-[#1F3D2B]/10 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
             <Zap size={32} className="text-[#1F3D2B]" />
          </div>
        </div>
      </section>

      {/* --- FEATURE SECTION --- */}
      <section className="bg-white py-32 px-12 rounded-[100px] shadow-sm mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1F3D2B]/30 mb-4">Architecture</h2>
            <p className="text-5xl font-serif italic text-[#1F3D2B]">Elegance Meets Intelligence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <FeatureCard 
              icon={<Sparkles />} 
              title="AI Narrative" 
              desc="Our AI crafts bullet points that highlight impact, not just duties." 
            />
            <FeatureCard 
              icon={<ShieldCheck />} 
              title="ATS Mastery" 
              desc="Precision layouts that pass through digital gatekeepers with ease." 
            />
            <FeatureCard 
              icon={<MousePointerClick />} 
              title="Tailored Flow" 
              desc="Dynamic templates that adapt to your unique professional story." 
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-32 px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <h2 className="text-5xl font-serif font-bold tracking-tighter italic">Ready for the next level?</h2>
          <button 
            onClick={() => navigate('/app')}
            className="px-14 py-6 bg-[#1F3D2B] text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shadow-[#1F3D2B]/20"
          >
            Create Your Vision
          </button>
          
          <div className="pt-24 flex flex-col items-center gap-6 border-t border-[#1F3D2B]/5 mt-20">
            {/* LOGO IN FOOTER */}
            <div className="scale-75 opacity-50">
               <div className="flex items-baseline">
                  <span className="text-6xl text-[#1F3D2B] font-serif font-bold italic">C</span>
                  <span className="text-4xl text-[#1F3D2B] font-serif font-light italic -ml-2">Vision</span>
               </div>
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30">
              © 2024 C VISION ARCHITECTURE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

      {/* Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');
      `}</style>
    </div>
  );
};

/* --- FEATURE CARD COMPONENT --- */
const FeatureCard = ({ icon, title, desc }) => (
  <div className="group space-y-6">
    <div className="w-16 h-16 rounded-3xl bg-[#F3EFE6] flex items-center justify-center text-[#1F3D2B] transition-all duration-500 group-hover:bg-[#1F3D2B] group-hover:text-white group-hover:rotate-6">
      {React.cloneElement(icon, { size: 28, strokeWidth: 1.5 })}
    </div>
    <h3 className="text-lg font-bold uppercase tracking-widest">{title}</h3>
    <p className="text-base text-[#1F3D2B]/50 font-medium leading-relaxed">{desc}</p>
    <div className="h-[1px] w-0 bg-[#1F3D2B]/20 group-hover:w-full transition-all duration-700" />
  </div>
);

export default Home;