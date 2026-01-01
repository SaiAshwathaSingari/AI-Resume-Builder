import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'sonner';

 
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
import api from "../configs/api.js";
import { setLoading } from "../redux/features/authSlice.js"; 
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "sonner";

const ResumeBuilder = () => {
  

  const [isSaving, setIsSaving] = useState(false);


  const resumeRef = useRef(null);

  const { resumeId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
 //Function to download the resume
const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//function to handle share
const handleShare = async () => {
  // window.location.origin gets ONLY the protocol + host (e.g., http://localhost:3000)
  // We then manually add /preview/ and the ID
  const shareUrl = `${window.location.origin}/view/${resumeId}`;

  try {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Preview link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy:", err);
    toast.error("Could not copy link.");
  }
};


const downloadResume = () => {
  const content = resumeRef.current;
  if (!content) return;

  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const pri = iframe.contentWindow;
  
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map(style => style.outerHTML)
    .join('');

  pri.document.open();
  pri.document.write(`
    <html>
      <head>
        <title>Professional Resume</title>
        ${styles}
        <style>
          /* 1. Define the physical paper size */
          @page { 
            size: A4; 
            margin: 0; 
          }
          
          /* 2. Reset Body for printing */
          body { 
            margin: 0; 
            padding: 0;
            background: #ffffff;
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important;
          }

          /* 3. The Paper Container */
          #print-root { 
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: none !important;
          }

          /* 4. Professional Cut Logic: Prevent Splitting Items */
          /* Apply these classes to your ResumePreview sub-components */
          .experience-item, 
          .education-item, 
          .project-item,
          .skills-group,
          header {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            display: block; /* Ensures break rules apply */
            position: relative;
          }

          /* 5. Heading Protection */
          h1, h2, h3 {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }

          /* 6. Clean Typography for PDF */
          * {
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
          }
        </style>
      </head>
      <body>
        <div id="print-root">
          ${content.innerHTML}
        </div>
      </body>
    </html>
  `);
  pri.document.close();

  // Give enough time for images (profile pic) to load in the iframe
  setTimeout(() => {
    pri.focus();
    pri.print();
    document.body.removeChild(iframe);
  }, 700);
};


const loadExisistingData = async()=>{
    try {
      const {data} = await api.get(`/api/resumes/get/${resumeId}`,{
        headers: {Authorization:token}
      })
      if(data.resume){
        setResumeData(data.resume);
        
      }
    } catch (error) {
      console.log(error)
    }
  }
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
    loadExisistingData();
  }, [resumeId]);

 const handlePublicToggle = async () => {
  // Determine the new state first
  const newPublicStatus = !resumeData.public;

  try {
    // 1. Prepare data for the API
    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify({ public: newPublicStatus }));

    // 2. Make the API request
    const { data } = await api.put('/api/resumes/update', formData, {
      headers: { Authorization: token }
    });
    console.log(data)
    // 3. Update local state with the new status
    setResumeData((prev) => ({
      ...prev,
      public: newPublicStatus
    }));

    // Optional: Add a success message
    toast.success(`Resume is now ${newPublicStatus ? 'Public' : 'Private'}`);
    
  } catch (error) {
    console.error("Toggle failed:", error);
    toast.error("Failed to update visibility settings.");
  }
};


 
 
  //Function to save
  const dispatch = useDispatch();
  const handleSave = async () => {
  setIsSaving(true);
  try {
    let updatedResumeData = structuredClone(resumeData);

    if (typeof resumeData.personal_info.image === "object") {
      delete updatedResumeData.personal_info.image;
    }

    const formData = new FormData();
    formData.append("resumeId", resumeId);
    formData.append("resumeData", JSON.stringify(updatedResumeData));

    resumeData.removeBackground && formData.append("removeBackground", "yes");
    typeof resumeData.personal_info.image === "object" &&
      formData.append("image", resumeData.personal_info.image);

    const { data } = await api.put("/api/resumes/update", formData, {
      headers: { Authorization: token },
    });
    toast.success(data.message)
    setResumeData(data.resume);
  } catch (err) {
    console.log(err);
  } finally {
    setIsSaving(false);
  }
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
  {/* LEFT: Back button and Title */}
  <div className="flex items-center gap-6">
    <button onClick={() => navigate("/app")} className="p-2 hover:bg-[#F3EFE6] rounded-full transition-colors">
      <MoveLeftIcon className="w-5 h-5 text-[#1F3D2B]" />
    </button>
    <div className="h-6 w-[1px] bg-black/10" />
    <h2 className="font-serif text-xl font-semibold text-[#1F3D2B]">Resume Editor</h2>
  </div>

  {/* CENTER: Navigation Tabs (Hidden on small screens) */}
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

  {/* RIGHT: Action Buttons */}
  <div className="flex items-center gap-4">
    {/* THE SAVE BUTTON - PLACED HERE */}


<button
  onClick={handleSave}
  disabled={isSaving}
  className="flex items-center gap-2 px-6 py-2.5 bg-[#1F3D2B] text-white rounded-full text-xs font-bold uppercase tracking-widest
             hover:bg-[#173023] transition-all shadow-md active:scale-95
             disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isSaving ? (
    <>
      {/* Spinner */}
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      <span>Saving...</span>
    </>
  ) : (
    "Save Changes"
  )}
</button>



    <button
      onClick={() => setIsToolbarOpen(!isToolbarOpen)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs transition-all border ${
        isToolbarOpen ? "bg-[#1F3D2B] text-white border-[#1F3D2B]" : "bg-white border-black/10 text-[#1F3D2B] hover:bg-[#F3EFE6]"
      }`}
    >
      <Settings2 size={16} />
      Design
      <ChevronDown size={14} className={`transition-transform duration-300 ${isToolbarOpen ? "rotate-180" : ""}`} />
    </button>
  </div>
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
              {resumeData.public && 
                <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-3 bg-[#F3EFE6] text-[#1F3D2B] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1F3D2B]/5 transition-all">
              
                <Share2 size={14} /> Share
              </button>
              }
              
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