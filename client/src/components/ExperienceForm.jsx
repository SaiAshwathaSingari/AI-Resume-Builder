import { 
  PlusIcon, 
  Trash2, 
  Sparkles, 
  Building2, 
  BriefcaseIcon, 
  CalendarDays, 
  ChevronRight,
  Info
} from "lucide-react";
import React from "react";

function ExperienceForm({ data, onChange }) {

  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updatedExperience = (index, field, value) => {
    onChange(
      data.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    );
  };

  const toggleCurrent = (index, checked) => {
    onChange(
      data.map((exp, i) =>
        i === index
          ? {
              ...exp,
              is_current: checked,
              end_date: checked ? "Present" : "",
            }
          : exp
      )
    );
  };

  const inputStyles = "w-full rounded-2xl border border-black/5 bg-white px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-[#1F3D2B]/5 focus:border-[#1F3D2B] placeholder:text-black/20 shadow-sm hover:border-black/10";

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* --- SECTION HEADER --- */}
      <div className="flex items-end justify-between border-b border-black/5 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#1F3D2B] font-bold text-[10px] uppercase tracking-[0.2em]">
            <BriefcaseIcon size={14} />
            Professional History
          </div>
          <h2 className="text-3xl font-serif font-medium text-[#1F3D2B]">Experience</h2>
        </div>

        <button
          onClick={addExperience}
          className="group flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full bg-[#1F3D2B] text-white hover:bg-[#2a4d3a] hover:shadow-xl hover:shadow-[#1F3D2B]/20 active:scale-95 transition-all duration-300"
        >
          <PlusIcon size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          Add Experience
        </button>
      </div>

      {/* --- EMPTY STATE --- */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 px-8 border-2 border-dashed border-black/5 rounded-[40px] bg-black/[0.01]">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-black/[0.03] flex items-center justify-center mb-6">
             <BriefcaseIcon className="text-[#1F3D2B]/20" size={40} />
          </div>
          <h3 className="text-lg font-medium text-[#1F3D2B] mb-2">No roles added yet</h3>
          <p className="text-sm text-black/40 mb-8 max-w-[280px] text-center">Highlight your professional journey by adding your previous and current roles.</p>
          <button 
            onClick={addExperience} 
            className="text-[#1F3D2B] font-black text-xs uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-2"
          >
            Start Building <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* --- EXPERIENCE CARDS --- */}
      <div className="space-y-8">
        {data.map((exp, index) => (
          <div
            key={index}
            className="group relative bg-[#FDFCF9] border border-black/5 rounded-[48px] p-10 shadow-sm hover:shadow-2xl hover:shadow-black/[0.04] transition-all duration-700 animate-in zoom-in-95"
          >
            {/* Index Badge & Delete */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-black/5 text-[#1F3D2B] text-xs font-black shadow-sm group-hover:bg-[#1F3D2B] group-hover:text-white transition-colors duration-500">
                   {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-[#1F3D2B] uppercase tracking-widest text-[10px]">Record Entry</h3>
                  <p className="text-xs text-black/40 italic">{exp.company || "Company Name"} — {exp.position || "Position"}</p>
                </div>
              </div>

              <button
                onClick={() => removeExperience(index)}
                className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
              >
                <Trash2 size={14} />
                Delete Entry
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 ml-2">
                    <Building2 size={12} className="text-[#1F3D2B]" /> Company Name
                  </label>
                  <input
                    className={inputStyles}
                    placeholder="e.g. Acme Corp"
                    value={exp.company}
                    onChange={(e) => updatedExperience(index, "company", e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 ml-2">
                    <BriefcaseIcon size={12} className="text-[#1F3D2B]" /> Job Position
                  </label>
                  <input
                    className={inputStyles}
                    placeholder="e.g. Senior Product Designer"
                    value={exp.position}
                    onChange={(e) => updatedExperience(index, "position", e.target.value)}
                  />
                </div>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 ml-2">
                    <CalendarDays size={12} className="text-[#1F3D2B]" /> Employment Start
                  </label>
                  <input
                    type="month"
                    className={inputStyles}
                    value={exp.start_date}
                    onChange={(e) => updatedExperience(index, "start_date", e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center px-2">
                     <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
                        <CalendarDays size={12} className="text-[#1F3D2B]" /> Employment End
                     </label>
                     <label className="group/check flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1F3D2B] cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 accent-[#1F3D2B] rounded-md border-black/10 transition-all"
                          checked={exp.is_current}
                          onChange={(e) => toggleCurrent(index, e.target.checked)}
                        />
                        Current
                     </label>
                  </div>
                  <input
                    type="month"
                    disabled={exp.is_current}
                    className={`${inputStyles} ${exp.is_current ? "bg-black/[0.03] text-black/20 border-dashed cursor-not-allowed shadow-none" : ""}`}
                    value={exp.is_current ? "" : exp.end_date}
                    onChange={(e) => updatedExperience(index, "end_date", e.target.value)}
                  />
                </div>
              </div>

              {/* Description & AI Assist */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-between px-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
                    <Info size={12} className="text-[#1F3D2B]" /> Key Achievements & Responsibilities
                  </label>
                  
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm group/ai cursor-help">
                    <Sparkles size={12} className="text-[#1F3D2B] animate-pulse" />
                    <span className="text-[9px] font-black text-[#1F3D2B] tracking-widest uppercase">AI Writing Assistant</span>
                  </div>
                </div>
                
                <div className="relative">
                  <textarea
                    className={`${inputStyles} min-h-[180px] resize-none leading-relaxed pt-6`}
                    placeholder="Describe your impact... e.g., 'Spearheaded the redesign of the mobile app, resulting in a 40% increase in user engagement.'"
                    value={exp.description}
                    onChange={(e) => updatedExperience(index, "description", e.target.value)}
                  />
                  <div className="absolute bottom-4 right-6 flex items-center gap-1.5 pointer-events-none opacity-30">
                     <span className="text-[10px] font-bold">Press '/' for AI commands</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1F3D2B]/[0.02] border border-[#1F3D2B]/5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#1F3D2B] animate-ping" />
                   <p className="text-[10px] text-black/50 font-medium">
                     <span className="text-[#1F3D2B] font-bold">Expert Tip:</span> Quantify your impact. Use metrics like percentages or revenue growth whenever possible.
                   </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- BOTTOM ADD BUTTON --- */}
      {data.length > 0 && (
        <div className="flex justify-center pt-8 pb-12">
          <button
            onClick={addExperience}
            className="flex items-center gap-3 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-full border border-black/10 hover:border-[#1F3D2B] hover:text-[#1F3D2B] hover:bg-white hover:shadow-2xl hover:shadow-[#1F3D2B]/10 transition-all duration-500"
          >
            <PlusIcon size={16} />
            Add Another Experience
          </button>
        </div>
      )}
    </div>
  );
}

export default ExperienceForm;