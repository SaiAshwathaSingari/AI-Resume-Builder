import { 
  PlusIcon, Trash2, Sparkles, Building2, BriefcaseIcon, CalendarDays, ChevronRight, Info 
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from '../configs/api.js'

function ExperienceForm({ data, onChange }) {
  const token = localStorage.getItem("token")
  const [isGenerating, setisGenerating] = useState(null);

  // Helper to ensure dates are in YYYY-MM format for the HTML5 input
  const formatForInput = (dateStr) => {
    if (!dateStr || dateStr === "Present") return "";
    if (dateStr.includes("-")) return dateStr; // Already YYYY-MM
    const date = new Date(dateStr);
    return isNaN(date) ? "" : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const handleAiEnhance = async (index, currentText) => {
    if (!currentText || currentText.length < 5) return alert("Please type some description first.");
    const experience = data[index]
    const prompt = `enchance the job description ${experience.description} for the position of ${experience.position}
      at ${experience.company}.
    `
    try {
      setisGenerating(index);
      const res = await api.post('/api/ai/enhance-job-des',
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      if (res.data?.enhancedContent) updatedExperience(index, "description", res.data.enhancedContent);
      console.log(res)
    } catch (error) {
      console.log(error);
    } finally {
      setisGenerating(null);
    }
  };

  const addExperience = () => {
    onChange([...data, {
      company: "", position: "", start_date: "", end_date: "", description: "", is_current: false,
    }]);
  };

  const removeExperience = (index) => onChange(data.filter((_, i) => i !== index));

  const updatedExperience = (index, field, value) => {
    onChange(data.map((exp, i) => i === index ? { ...exp, [field]: value } : exp));
  };

  const toggleCurrent = (index, checked) => {
    onChange(data.map((exp, i) => i === index ? { 
      ...exp, is_current: checked, end_date: checked ? "Present" : "" 
    } : exp));
  };

  const inputStyles = "w-full rounded-2xl border border-black/5 bg-white px-5 py-3.5 text-sm transition-all focus:outline-none focus:ring-4 focus:ring-[#1F3D2B]/5 focus:border-[#1F3D2B] placeholder:text-black/20 shadow-sm hover:border-black/10";

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex items-end justify-between border-b border-black/5 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#1F3D2B] font-bold text-[10px] uppercase tracking-[0.2em]"><BriefcaseIcon size={14} /> Professional History</div>
          <h2 className="text-3xl font-serif font-medium text-[#1F3D2B]">Experience</h2>
        </div>
        <button onClick={addExperience} className="group flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full bg-[#1F3D2B] text-white hover:bg-[#2a4d3a] transition-all"><PlusIcon size={18} /> Add Experience</button>
      </div>

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-black/5 rounded-[40px] bg-black/[0.01]">
          <BriefcaseIcon className="text-[#1F3D2B]/20 mb-6" size={40} />
          <h3 className="text-lg font-medium text-[#1F3D2B] mb-2">No roles added yet</h3>
          <button onClick={addExperience} className="text-[#1F3D2B] font-black text-xs uppercase tracking-widest flex items-center gap-2">Start Building <ChevronRight size={14} /></button>
        </div>
      )}

      <div className="space-y-8">
        {data.map((exp, index) => (
          <div key={index} className="group relative bg-[#FDFCF9] border border-black/5 rounded-[48px] p-10 shadow-sm hover:shadow-2xl transition-all duration-700">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-black/5 text-[#1F3D2B] text-xs font-black">{index + 1}</div>
                <div>
                  <h3 className="font-bold text-[#1F3D2B] uppercase tracking-widest text-[10px]">Record Entry</h3>
                  <p className="text-xs text-black/40 italic">{exp.company || "Company"} — {exp.position || "Position"}</p>
                </div>
              </div>
              <button onClick={() => removeExperience(index)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all text-[10px] font-black uppercase flex items-center gap-1.5"><Trash2 size={14} /> Delete</button>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input className={inputStyles} placeholder="Company Name" value={exp.company} onChange={(e) => updatedExperience(index, "company", e.target.value)} />
                <input className={inputStyles} placeholder="Job Position" value={exp.position} onChange={(e) => updatedExperience(index, "position", e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <input type="month" className={inputStyles} value={formatForInput(exp.start_date)} onChange={(e) => updatedExperience(index, "start_date", e.target.value)} />
                <div className="space-y-3">
                  <div className="flex justify-between px-2">
                    <label className="text-[10px] font-black uppercase text-black/30">End Date</label>
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-[#1F3D2B] cursor-pointer">
                      <input type="checkbox" checked={exp.is_current} onChange={(e) => toggleCurrent(index, e.target.checked)} /> Current
                    </label>
                  </div>
                  <input type="month" disabled={exp.is_current} className={`${inputStyles} ${exp.is_current ? "bg-black/[0.03] opacity-50" : ""}`} value={formatForInput(exp.end_date)} onChange={(e) => updatedExperience(index, "end_date", e.target.value)} />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-between px-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase text-black/30"><Info size={12} /> Achievements</label>
                  <button type="button" onClick={() => handleAiEnhance(index, exp.description)} disabled={isGenerating === index} className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F3D2B]/5 border border-[#1F3D2B]/10 hover:bg-[#1F3D2B] hover:text-white transition-all disabled:opacity-50 group/ai">
                    {isGenerating === index ? <div className="h-3 w-3 animate-spin rounded-full border-2 border-[#1F3D2B] border-t-transparent group-hover/ai:border-white" /> : <Sparkles size={12} />}
                    <span className="text-[9px] font-black uppercase">{isGenerating === index ? "Refining..." : "AI Enhance"}</span>
                  </button>
                </div>
                <textarea className={`${inputStyles} min-h-[180px] resize-none pt-6`} placeholder="Describe your impact..." value={exp.description} onChange={(e) => updatedExperience(index, "description", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceForm;