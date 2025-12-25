import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  Briefcase,
  FileText,
  FolderIcon,
  GraduationCap,
  MoveLeftIcon,
  Sparkles,
  User,
  Palette,
  LayoutTemplate,
  ChevronDown,
  Settings2,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import SummaryForm from "../components/SummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import TemplateSelector from "../components/TemplateSelector";
import AccentSelector from "../components/AccentSelector";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "projects", name: "Projects", icon: FolderIcon },
  ];

  const [resumeData, setResumeData] = useState({
    personal_info: {},
    professional_summary: "",
    experience: [],
    template: "classic",
    accent_color: "#1F3D2B",
  });

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume)
      setResumeData((prev) => ({
        ...prev,
        ...resume,
      }));
  }, [resumeId]);

  const renderActiveForm = () => {
    const active = sections[activeSectionIndex].id;
    if (active === "personal")
      return <PersonalInfoForm data={resumeData.personal_info} onChange={(newData) => setResumeData((prev) => ({ ...prev, personal_info: newData }))} />;
    if (active === "summary")
      return <SummaryForm data={resumeData.professional_summary} onChange={(newData) => setResumeData((prev) => ({ ...prev, professional_summary: newData }))} />;
    if (active === "experience")
      return <ExperienceForm data={resumeData.experience} onChange={(newData) => setResumeData((prev) => ({ ...prev, experience: newData }))} />;

    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-black/5 rounded-2xl bg-black/[0.01]">
        <p className="text-sm font-medium text-black/30 italic">{sections[activeSectionIndex].name} coming soon</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col">
      {/* ================= TOP NAVIGATION & TOOLBAR ================= */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-black/5 px-8 h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/app")}
            className="p-2 hover:bg-[#F3EFE6] rounded-full transition-colors"
          >
            <MoveLeftIcon className="w-5 h-5 text-black/60" />
          </button>
          <div className="h-6 w-[1px] bg-black/10" />
          <h2 className="font-serif text-xl font-semibold text-[#1F3D2B]">Resume Editor</h2>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-[#F3EFE6]/50 p-1 rounded-xl border border-black/5">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setActiveSectionIndex(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeSectionIndex === idx
                  ? "bg-white text-[#1F3D2B] shadow-sm"
                  : "text-black/40 hover:text-black/60"
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsToolbarOpen(!isToolbarOpen)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
            isToolbarOpen ? "bg-[#1F3D2B] text-white" : "bg-white border border-black/10 text-black/70 hover:border-[#1F3D2B]"
          }`}
        >
          <Settings2 size={18} />
          Design Settings
          <ChevronDown size={16} className={`transition-transform duration-300 ${isToolbarOpen ? "rotate-180" : ""}`} />
        </button>
      </nav>

      {/* ================= SLIDE-DOWN DESIGN PANEL ================= */}
      {/* FIX: We only use overflow-hidden during the transition. Once open, we allow visible overflow for dropdowns */}
      <div 
        className={`z-[90] bg-white border-b border-black/10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isToolbarOpen ? "max-h-[500px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto p-8 grid grid-cols-2 gap-12">
          {/* FIX: Wrapped selectors in relative z-containers */}
          <div className="space-y-4 relative z-[92]">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-black/30">
              <Palette size={14} className="text-[#1F3D2B]" /> Accent Color Scheme
            </label>
            <AccentSelector
              data={resumeData}
              onChange={(color) => setResumeData((p) => ({ ...p, accent_color: color }))}
            />
          </div>
          <div className="space-y-4 relative z-[91]">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-black/30">
              <LayoutTemplate size={14} className="text-[#1F3D2B]" /> Resume Template
            </label>
            <TemplateSelector
              data={resumeData}
              onChange={(template) => setResumeData((p) => ({ ...p, template }))}
            />
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col lg:flex-row gap-12 p-8 lg:p-16 max-w-[1800px] mx-auto w-full">
        <section className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F3D2B]/5 text-[#1F3D2B] text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles size={12} /> Editing Mode
            </div>
            <h1 className="text-6xl font-serif font-medium text-[#1F3D2B] tracking-tight">
              {sections[activeSectionIndex].name}
            </h1>
          </div>

          <div className="bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-black/[0.04] p-12 min-h-[600px]">
            {renderActiveForm()}
          </div>
        </section>

        <section className="shrink-0 flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="sticky top-32">
            <div className="relative group">
              <div className="absolute -inset-4 bg-black/[0.02] rounded-[24px] blur-2xl" />
              
              <div className="relative bg-white shadow-[0_50px_100px_rgba(0,0,0,0.15),0_15px_35px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden ring-1 ring-black/5">
                <div
                  style={{
                    width: "794px",
                    height: "1123px",
                    backgroundColor: "white",
                  }}
                  className="scale-[0.7] xl:scale-[0.9] 2xl:scale-100 origin-top transition-transform duration-700 ease-out"
                >
                  <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                  />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white border border-black/5 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-tighter opacity-50">Auto-saved</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResumeBuilder;