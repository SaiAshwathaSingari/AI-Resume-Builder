import {
  Briefcase,
  Globe,
  Linkedin,
  MapPin, // Fixed: Changed from LocationEditIcon
  Mail,
  Phone,
  User,
  Camera,
  Sparkles, // Fixed: Added missing import
} from "lucide-react";
import React from "react";

function PersonalInfoForm({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // Helper to safely handle image preview
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

  const inputStyles = "w-full rounded-xl border border-black/10 bg-white px-5 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/20 focus:border-[#1F3D2B] placeholder:text-black/20";

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between pb-4 border-b border-black/10">
        <h2 className="text-xl font-semibold text-[#1F3D2B] flex items-center gap-2">
          <User size={20} /> Personal Details
        </h2>
      </div>

      <div className="p-8 bg-[#F3EFE6] border border-black/10 rounded-[32px] space-y-8">
        
        {/* --- PHOTO UPLOAD --- */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <label className="group relative cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-[#1F3D2B]/20 group-hover:border-[#1F3D2B]/40 transition-all flex items-center justify-center bg-white shadow-sm">
              {data.image ? (
                <img
                  src={getImagePreview()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-[#1F3D2B]/30">
                  <Camera size={24} />
                </div>
              )}
            </div>
            
            <div className="absolute bottom-0 right-0 p-2 bg-[#1F3D2B] text-white rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform">
              <Camera size={14} />
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleChange("image", e.target.files[0])}
            />
          </label>
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1F3D2B]/40">Profile Photo</p>
          </div>
        </div>

        {/* --- FORM FIELDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.key} className={field.key === "full_name" || field.key === "profession" ? "md:col-span-2" : ""}>
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#1F3D2B]/60 ml-1 mb-2">
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

        {/* --- AI BACKGROUND REMOVER SECTION --- */}
        {data.image && (
          <div className="flex items-center justify-between px-6 py-4 rounded-2xl bg-white/50 border border-black/5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1F3D2B]/10 flex items-center justify-center text-[#1F3D2B]">
                <Sparkles size={14} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#1F3D2B] uppercase tracking-tighter">AI Background Remover</p>
                <p className="text-[10px] text-black/40">Coming Soon</p>
              </div>
            </div>
            <div className="w-10 h-5 bg-black/10 rounded-full relative">
               <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalInfoForm;