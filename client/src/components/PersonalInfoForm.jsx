import {
  Briefcase,
  Globe,
  Linkedin,
  LocationEditIcon,
  Mail,
  Phone,
  User,
} from "lucide-react";
import React from "react";

function PersonalInfoForm({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: LocationEditIcon, type: "text" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="bg-white rounded-xl border border-black/10 shadow-sm p-6 max-w-md">
      
      {/* Header */}
      <div className="mb-6">
        <p className="text-lg font-semibold text-[#1F3D2B]">
          Personal Information
        </p>
        <p className="text-sm text-[#1F3D2B]/60">
          Get started with your personal details
        </p>
      </div>

      <form className="space-y-6">
        
        {/* Image Upload */}
        <label className="cursor-pointer flex flex-col items-center gap-3">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border border-black/15 shadow-sm"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border border-dashed border-black/20 flex items-center justify-center text-sm text-black/40 bg-[#F3EFE6]">
              Upload Photo
            </div>
          )}

          <span className="text-xs text-black/50">
            Click to upload (PNG, JPG)
          </span>

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {/* Form Fields */}
        <div className="space-y-4">
          {fields.map((field) => {
            const Icon = field.icon;

            return (
              <div key={field.key}>
                <label className="text-sm font-medium text-[#1F3D2B]">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                <div className="mt-1 flex items-center gap-3 px-3 py-2 rounded-lg border border-black/10 bg-white focus-within:border-[#1F3D2B]/40">
                  <Icon className="w-4 h-4 text-black/40" />
                  <input
                    type={field.type}
                    value={data[field.key] || ""}
                    onChange={(e) =>
                      handleChange(field.key, e.target.value)
                    }
                    className="w-full bg-transparent text-sm outline-none placeholder:text-black/30"
                    placeholder={field.label}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Remove Background – Coming Soon */}
        {data.image && (
          <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-black/10 bg-[#F3EFE6] opacity-60">
            <div>
              <p className="text-sm font-medium text-[#1F3D2B]">
                Remove Background
              </p>
              <p className="text-xs text-[#1F3D2B]/60">
                Coming soon
              </p>
            </div>

            <input
              type="checkbox"
              disabled
              className="w-4 h-4 accent-[#1F3D2B] cursor-not-allowed"
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default PersonalInfoForm;
