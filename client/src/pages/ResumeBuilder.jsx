import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

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
  EyeIcon,
  EyeClosedIcon,
  DownloadIcon,
  Share2,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import SummaryForm from "../components/SummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import TemplateSelector from "../components/TemplateSelector";
import AccentSelector from "../components/AccentSelector";
import EducatioinForm from "../components/EducatioinForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

const ResumeBuilder = () => {
  const resumeRef = useRef(null);

  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
 
  const downloadResume = async () => {
  const element = resumeRef.current;
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,          // higher = sharper PDF
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "pt", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight =
    (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("resume.pdf");
};



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
    education: [],
    template: "classic",
    accent_color: "#1F3D2B",
    public: false,
  });

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) setResumeData((prev) => ({ ...prev, ...resume }));
  }, [resumeId]);

  const handlePublicToggle = () => {
    setResumeData((prev) => ({
      ...prev,
      public: !prev.public
    }));
  };

  const renderActiveForm = () => {
    const active = sections[activeSectionIndex].id;
    if (active === "personal") return <PersonalInfoForm data={resumeData.personal_info} onChange={(newData) => setResumeData(p => ({ ...p, personal_info: newData }))} />;
    if (active === "summary") return <SummaryForm data={resumeData.professional_summary} onChange={(newData) => setResumeData(p => ({ ...p, professional_summary: newData }))} />;
    if (active === "experience") return <ExperienceForm data={resumeData.experience} onChange={(newData) => setResumeData(p => ({ ...p, experience: newData }))} />;
    if (active === "education") return <EducatioinForm data={resumeData.education} onChange={(newData) => setResumeData(p => ({ ...p, education: newData }))} />;
    if (active === "projects") return <ProjectForm data={resumeData.project} onChange={(newData) => setResumeData((prev) => ({ ...prev, project: newData }))} />;
    if (active === "skills") return <SkillsForm data={resumeData.skills} onChange={(newData) => setResumeData((prev) => ({ ...prev, skills: newData }))} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex flex-col">
      
      {/* --- TOP NAVIGATION --- */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-black/10 px-8 h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/app")} className="p-2 hover:bg-[#F3EFE6] rounded-full transition-colors">
            <MoveLeftIcon className="w-5 h-5 text-[#1F3D2B]" />
          </button>
          <div className="h-6 w-[1px] bg-black/10" />
          <h2 className="font-serif text-xl font-semibold text-[#1F3D2B]">Resume Editor</h2>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-[#F3EFE6] p-1 rounded-xl border border-black/5">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => setActiveSectionIndex(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeSectionIndex === idx ? "bg-white text-[#1F3D2B] shadow-sm" : "text-[#1F3D2B]/40 hover:text-[#1F3D2B]/70"
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsToolbarOpen(!isToolbarOpen)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all border ${
            isToolbarOpen ? "bg-[#1F3D2B] text-white border-[#1F3D2B]" : "bg-white border-black/10 text-[#1F3D2B] hover:bg-[#F3EFE6]"
          }`}
        >
          <Settings2 size={18} />
          Design Settings
          <ChevronDown size={16} className={`transition-transform duration-300 ${isToolbarOpen ? "rotate-180" : ""}`} />
        </button>
      </nav>

      {/* --- DESIGN PANEL --- */}
      <div className={`z-[90] bg-white border-b border-black/10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isToolbarOpen ? "max-h-[500px] opacity-100 overflow-visible" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="max-w-7xl mx-auto p-8 grid grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-[#1F3D2B]/40">
              <Palette size={14} className="text-[#1F3D2B]" /> Accent Color
            </label>
            <AccentSelector data={resumeData} onChange={(color) => setResumeData(p => ({ ...p, accent_color: color }))} />
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-[#1F3D2B]/40">
              <LayoutTemplate size={14} className="text-[#1F3D2B]" /> Template
            </label>
            <TemplateSelector data={resumeData} onChange={(template) => setResumeData(p => ({ ...p, template }))} />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col lg:flex-row gap-12 p-8 lg:p-16 max-w-[1800px] mx-auto w-full">
        
        {/* FORM SECTION */}
        <section className="flex-1 space-y-8 animate-in fade-in duration-700">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F3D2B]/10 text-[#1F3D2B] text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles size={12} /> Editing Mode
            </div>
            <h1 className="text-6xl font-serif font-medium text-[#1F3D2B] tracking-tight lowercase">
              {sections[activeSectionIndex].name}.
            </h1>
          </div>

          <div className="bg-[#F3EFE6] rounded-[40px] shadow-sm border border-black/10 p-12 min-h-[600px]">
            {renderActiveForm()}
          </div>
        </section>

        {/* --- PREVIEW & ACTIONS SECTION --- */}
        <section className="shrink-0 flex flex-col items-center lg:items-end gap-6 animate-in fade-in duration-700">
          
          {/* FLOATING ACTION BAR */}
          <div className="w-full flex items-center justify-between bg-white border border-black/10 p-3 rounded-3xl shadow-xl shadow-black/5">
            <div className="flex gap-2">
              <button 
                onClick={handlePublicToggle}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  resumeData.public 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-gray-50 text-gray-400 border border-gray-100"
                }`}
              >
                {resumeData.public ? <><EyeIcon size={14} /> Public</> : <><EyeClosedIcon size={14} /> Private</>}
              </button>
              
              <button className="flex items-center gap-2 px-4 py-3 bg-[#F3EFE6] text-[#1F3D2B] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1F3D2B]/5 transition-all">
                <Share2 size={14} /> Share
              </button>
            </div>

            <button onClick={downloadResume} className="flex items-center gap-3 px-8 py-3 bg-[#1F3D2B] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#1F3D2B]/20 transition-all active:scale-95">
              <DownloadIcon size={16} /> Download PDF
            </button>
          </div>

          {/* RESUME PREVIEW CONTAINER */}
          <div className="sticky top-32">
            <div className="relative group">
              <div className="relative bg-white shadow-[0_50px_100px_rgba(0,0,0,0.12)] border border-black/5 overflow-hidden ring-1 ring-black/5 rounded-sm">
                <div 
                  ref={resumeRef}
                  style={{ width: "794px", height: "1123px" }}
                  className="scale-[0.55] xl:scale-[0.75] 2xl:scale-[0.9] origin-top transition-transform duration-700 ease-out"
                >
                  <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
                </div>
              </div>

              {/* LIVE SYNC STATUS */}
              <div className="absolute -top-3 -right-3 bg-white border border-black/10 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1F3D2B]/40">Live Sync</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResumeBuilder;