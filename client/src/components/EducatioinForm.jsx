import { 
  PlusIcon, 
  Trash2, 
  GraduationCap, 
  School, 
  BookOpen, 
  CalendarDays, 
  Award 
} from "lucide-react";
import React from "react";

function EducationForm({ data, onChange }) {

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: ""
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (index, field, value) => {
    const updatedData = data.map((edu, i) => {
      if (i === index) return { ...edu, [field]: value };
      return edu;
    });
    onChange(updatedData);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  // Border and focus ring match the Dashboard's input style
  const inputStyles = "w-full rounded-xl border border-black/10 bg-white px-5 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/20 focus:border-[#1F3D2B] placeholder:text-black/30";

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10">
        <h2 className="text-xl font-semibold text-[#1F3D2B] flex items-center gap-2">
          <GraduationCap size={20} /> Education
        </h2>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-[#1F3D2B] text-white hover:bg-[#173022] transition-all"
        >
          <PlusIcon size={14} /> Add Education
        </button>
      </div>

      {/* --- LIST --- */}
      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-black/10 rounded-3xl text-[#1F3D2B]/40 text-xs font-bold uppercase tracking-widest">
            No education entries yet
          </div>
        ) : (
          data.map((edu, index) => (
            <div
              key={index}
              className="relative p-8 bg-[#F3EFE6] border border-black/10 rounded-[32px] space-y-6 transition-all"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-[#1F3D2B] uppercase tracking-widest bg-[#1F3D2B]/10 px-3 py-1 rounded-full">
                  Entry 0{index + 1}
                </span>
                <button
                  onClick={() => removeEducation(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Grid Layout for Inputs */}
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#1F3D2B]/60 ml-1">
                    <School size={12} /> Institution
                  </label>
                  <input
                    className={inputStyles}
                    placeholder="University Name"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#1F3D2B]/60 ml-1">
                      <BookOpen size={12} /> Degree
                    </label>
                    <input
                      className={inputStyles}
                      placeholder="e.g. Bachelor's"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#1F3D2B]/60 ml-1">
                      <Award size={12} /> Field
                    </label>
                    <input
                      className={inputStyles}
                      placeholder="e.g. Computer Science"
                      value={edu.field}
                      onChange={(e) => updateEducation(index, "field", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#1F3D2B]/60 ml-1">
                      <CalendarDays size={12} /> Graduation Date
                    </label>
                    <input
                      type="month"
                      className={inputStyles}
                      value={edu.graduation_date}
                      onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#1F3D2B]/60 ml-1">
                      <Award size={12} /> GPA / Grade
                    </label>
                    <input
                      className={inputStyles}
                      placeholder="e.g. 3.8/4.0"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EducationForm;