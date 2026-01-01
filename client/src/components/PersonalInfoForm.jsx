import {
  Briefcase,
  Globe,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  User,
  Camera,
  Sparkles,
  Wand2,
} from "lucide-react";
import React from "react";

function PersonalInfoForm({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const getImagePreview = () => {
    if (!data.image) return null;
    if (typeof data.image === "string") return data.image;
    try {
      return URL.createObjectURL(data.image);
    } catch (e) {
      return null;
    }
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "profession", label: "Professional Title", icon: Briefcase, type: "text" },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "linkedin", label: "LinkedIn URL", icon: Linkedin, type: "url" },
    { key: "website", label: "Portfolio/Website", icon: Globe, type: "url" },
  ];

  const inputStyles = "w-full rounded-xl border border-black/10 bg-white px-5 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/20 focus:border-[#1F3D2B] placeholder:text-black/20 text-[#1F3D2B]";

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10">
        <h2 className="text-xl font-semibold text-[#1F3D2B] flex items-center gap-2">
          <User size={20} /> Personal Details
        </h2>
      </div>

      <div className="p-8 bg-[#F3EFE6] border border-black/10 rounded-[40px] space-y-10">
        
        {/* --- PHOTO UPLOAD AREA --- */}
        <div className="flex flex-col items-center justify-center">
          <label className="group relative cursor-pointer block">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white group-hover:border-[#1F3D2B]/20 transition-all flex items-center justify-center bg-white shadow-xl">
              {data.image ? (
                <img
                  src={getImagePreview()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-[#1F3D2B]/20">
                  <Camera size={40} strokeWidth={1.5} />
                </div>
              )}
            </div>
            
            <div className="absolute bottom-1 right-1 p-3 bg-[#1F3D2B] text-white rounded-full shadow-lg scale-100 group-hover:scale-110 transition-transform border-4 border-[#F3EFE6]">
              <Camera size={16} />
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleChange("image", e.target.files[0])}
            />
          </label>
        </div>

        {/* --- BIG AI SLIDER (ALWAYS VISIBLE) --- */}
        <div className="max-w-xs mx-auto w-full">
          <div 
            onClick={() => handleChange("removeBg", !data.removeBg)}
            className="group cursor-pointer relative flex items-center justify-between p-4 bg-white rounded-[24px] border border-black/5 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl transition-colors ${data.removeBg ? 'bg-[#1F3D2B] text-white' : 'bg-[#1F3D2B]/5 text-[#1F3D2B]'}`}>
                <Wand2 size={18} className={data.removeBg ? 'animate-pulse' : ''} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#1F3D2B]">AI Remover</span>
                <span className="text-[9px] font-bold text-black/30 uppercase">{data.removeBg ? 'Active' : 'Disabled'}</span>
              </div>
            </div>

            {/* THE ACTUAL SLIDE SWITCH */}
            <div className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${data.removeBg ? 'bg-[#1F3D2B]' : 'bg-black/10'}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${data.removeBg ? 'left-8' : 'left-1'}`} />
            </div>
          </div>
          
          {!data.image && (
            <p className="text-center mt-3 text-[9px] font-bold text-[#1F3D2B]/30 uppercase tracking-tighter">
              Upload a photo to see the magic
            </p>
          )}
        </div>

        {/* --- FORM FIELDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.key} className={field.key === "full_name" || field.key === "profession" ? "md:col-span-2" : ""}>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#1F3D2B]/50 ml-1 mb-2">
                  <Icon size={12} /> {field.label}
                  {field.required && <span className="text-red-400">*</span>}
                </label>
                <input
                  type={field.type}
                  className={inputStyles}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={data[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default PersonalInfoForm;