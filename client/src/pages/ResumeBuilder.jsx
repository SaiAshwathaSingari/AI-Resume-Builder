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
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import AccentSelector from "../components/AccentSelector";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Professional Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "projects", name: "Projects", icon: FolderIcon },
  ];

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    template: "classic",
    accent_color: "#3b82f6",
    public: false,
  });

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) setResumeData(resume);
  }, [resumeId]);

  return (
    <div className="min-h-screen bg-[#F3EFE6]">
      {/* Back Button */}
      <div className="px-8 py-4">
        <button
          onClick={() => navigate("/app")}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-black/10 shadow-sm hover:bg-gray-50 transition"
        >
          <MoveLeftIcon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Back to Dashboard</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="px-8 pb-12">
        {/* Layout: Left column contains Template (compact) on top, then Sections; then Form; then Preview */}
        <div className="grid grid-cols-[220px_1fr_820px] gap-6 items-start">

          {/* LEFT COLUMN – Template (top) + Sections (below) */}
          <div className="space-y-4">
            <AccentSelector 
              data={resumeData}
              onChange={(newAccent)=>{
                setResumeData((prev)=>({
                  ...prev,
                  accent_color: newAccent,

                }))
              }}
            />
            {/* Compact Template selector on top */}
            <div className="bg-white rounded-xl border border-black/10 shadow-sm p-3">
              <TemplateSelector
                data={resumeData}
                onChange={(template) =>
                  setResumeData((prev) => ({
                    ...prev,
                    template,
                  }))
                }
              />
            </div>

            {/* Sections (info gathering) */}
            <div className="bg-white rounded-xl border border-black/10 shadow-sm p-4 space-y-2">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.id}
                    onClick={() => setActiveSectionIndex(index)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                      ${
                        activeSectionIndex === index
                          ? "bg-[#F3EFE6] text-[#1F3D2B]"
                          : "text-black/60 hover:bg-black/5"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER – Form (no inner scroll; page scrolls normally) */}
          <div className="bg-white rounded-xl border border-black/10 shadow-sm p-6">
            {sections[activeSectionIndex].id === "personal" && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(newData) =>
                  setResumeData((prev) => ({
                    ...prev,
                    personal_info: newData,
                  }))
                }
              />
            )}
          </div>

          {/* RIGHT – Resume Preview (actual A4 size, no internal scroll) */}
          <div>
            <div className="bg-white rounded-xl border border-black/10 shadow-sm p-4 flex justify-center">
              <div
                className="bg-white"
                style={{
                  width: 794,
                  height: 1123,
                  boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
