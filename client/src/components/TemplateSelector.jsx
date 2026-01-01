import React from "react";
import { ChevronDown, Check } from "lucide-react";

function TemplateSelector({ data, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "Traditional layout with a clean professional look",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Bold headings with a contemporary style",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple, clean and distraction-free layout",
    },
    {
      id: "minimal-image",
      name: "Minimal with Image",
      description: "Minimal layout with profile image section",
    },
  ];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#F3EFE6] border border-black/10 text-sm font-medium text-[#1F3D2B] hover:bg-[#ece6db] transition"
      >
        <span>
          Template:{" "}
          <span className="font-semibold capitalize">
            {data.template}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden">
          {templates.map((template) => {
            const active = data.template === template.id;

            return (
              <div
                key={template.id}
                onClick={() => {
                  onChange(template.id);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer transition flex gap-3
                  ${
                    active
                      ? "bg-[#F3EFE6]"
                      : "hover:bg-black/5"
                  }
                `}
              >
                {/* Left */}
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#1F3D2B]">
                    {template.name}
                  </h3>
                  <p className="text-xs text-black/60">
                    {template.description}
                  </p>
                </div>

                {/* Selected Tick */}
                {active && (
                  <Check className="w-4 h-4 text-[#1F3D2B]" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TemplateSelector;
