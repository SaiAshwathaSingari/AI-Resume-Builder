import { PlusIcon, FolderIcon, Trash2, Sparkles, Tag, Briefcase } from 'lucide-react';
import React from 'react';

function ProjectForm({ data = [], onChange }) {
  
  const addProject = () => {
    const newProject = { name: "", type: "", description: "" };
    onChange([...data, newProject]);
  };

  const updateProject = (index, field, value) => {
    const updatedData = data.map((item, i) => {
      if (i === index) return { ...item, [field]: value };
      return item;
    });
    onChange(updatedData);
  };

  const removeProject = (index) => {
    const updatedProjects = data.filter((_, i) => i !== index);
    onChange(updatedProjects);
  };

  // Professional Medium-Sized Design Tokens
  const inputStyles = "w-full rounded-xl border border-black/10 bg-white px-5 py-3.5 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/10 focus:border-[#1F3D2B] placeholder:text-black/20 text-[#1F3D2B]";
  const labelStyles = "flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-[#1F3D2B]/60 ml-1 mb-2";

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between pb-5 border-b border-[#1F3D2B]/10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#1F3D2B]">Projects</h2>
          <p className="text-xs text-[#1F3D2B]/50 font-medium italic">Highlight your key achievements</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#1F3D2B] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#1F3D2B]/90 transition-all shadow-sm"
        >
          <PlusIcon size={14} strokeWidth={2.5} /> Add Project
        </button>
      </div>

      {/* --- PROJECTS LIST --- */}
      <div className="space-y-6">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#F3EFE6]/50 rounded-[32px] border-2 border-dashed border-[#1F3D2B]/5">
            <FolderIcon size={32} className="text-[#1F3D2B]/10 mb-2" />
            <p className="text-sm font-serif italic text-[#1F3D2B]/30">No projects listed</p>
          </div>
        ) : (
          data.map((project, index) => (
            <div 
              key={index} 
              className="relative p-8 bg-[#F3EFE6] border border-black/5 rounded-[32px] transition-all hover:border-[#1F3D2B]/10"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1F3D2B] text-white font-serif text-lg font-bold">
                    {index + 1}
                  </div>
                  <span className="text-[10px] font-black text-[#1F3D2B] uppercase tracking-widest">Entry Details</span>
                </div>
                <button 
                  onClick={() => removeProject(index)}
                  className="p-2 text-red-400/60 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Vertical Stack: Each input in its own row */}
              <div className="space-y-6">
                
                {/* Project Name */}
                <div className="w-full">
                  <label className={labelStyles}>Project Name</label>
                  <input 
                    type="text"
                    className={inputStyles}
                    value={project.name}
                    placeholder="e.g. Portfolio Website"
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                  />
                </div>

                {/* Project Category (Strictly on its own row) */}
                <div className="w-full">
                  <label className={labelStyles}>Project Category</label>
                  <input 
                    type="text"
                    className={inputStyles}
                    value={project.type}
                    placeholder="e.g. Web Development"
                    onChange={(e) => updateProject(index, 'type', e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="w-full">
                  <label className={labelStyles}>Description</label>
                  <textarea
                    rows={4}
                    className={`${inputStyles} resize-none leading-relaxed`}
                    value={project.description}
                    placeholder="Detail your contributions and results..."
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- FOOTER TIP --- */}
      {data.length > 0 && (
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#1F3D2B]/10">
          <Sparkles size={18} className="text-[#1F3D2B]" />
          <p className="text-[11px] text-[#1F3D2B]/60 font-medium">
            <span className="font-bold uppercase tracking-tighter mr-1 text-[#1F3D2B]">Note:</span> 
            Keep project titles concise to ensure they fit perfectly on the final resume template.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectForm;