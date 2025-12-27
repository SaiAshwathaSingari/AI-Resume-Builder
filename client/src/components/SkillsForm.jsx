import { PlusIcon, X, Wrench } from 'lucide-react';
import React from 'react';

function SkillsForm({ data = [], onChange }) {
  const [skill, setSkill] = React.useState("");

  const addSkill = () => {
    if (skill.trim() === "") return;
    const updatedSkills = [...data, skill.trim()];
    onChange(updatedSkills);
    setSkill("");
  };

  const removeSkill = (indexToRemove) => {
    const updatedSkills = data.filter((_, index) => index !== indexToRemove);
    onChange(updatedSkills);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      
      {/* --- HEADER (text-2xl) --- */}
      <div className="flex items-center justify-between pb-5 border-b border-[#1F3D2B]/10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#1F3D2B]">Skills</h2>
          <p className="text-xs text-[#1F3D2B]/50 font-medium italic">Your technical and soft-skill toolkit</p>
        </div>
        <div className="p-2 bg-[#F3EFE6] rounded-xl text-[#1F3D2B]/40">
           <Wrench size={20} />
        </div>
      </div>

      {/* --- SKILLS TAG CLOUD (text-base) --- */}
      <div className="p-6 bg-[#F3EFE6] border border-black/5 rounded-[32px] min-h-[120px]">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-20">
            <p className="text-sm font-serif italic text-[#1F3D2B]/30">No skills added yet</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {data.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white border border-[#1F3D2B]/10 px-5 py-2.5 rounded-full shadow-sm hover:border-[#1F3D2B]/30 transition-all"
              >
                <span className="text-base font-medium text-[#1F3D2B]">{skill}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-[#1F3D2B]/30 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- INPUT AREA (text-base) --- */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-[#1F3D2B]/60 ml-1">
          Add New Skill
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="e.g. Project Management"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            className="flex-1 rounded-xl border border-black/10 bg-white px-6 py-4 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/10 focus:border-[#1F3D2B] placeholder:text-black/20 text-[#1F3D2B]"
            required
          />
          <button
            onClick={addSkill}
            className="flex items-center gap-2 bg-[#1F3D2B] text-white px-8 py-4 rounded-xl hover:bg-[#1F3D2B]/90 transition-all shadow-md active:scale-95"
          >
            <PlusIcon size={20} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-widest">Add</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default SkillsForm;