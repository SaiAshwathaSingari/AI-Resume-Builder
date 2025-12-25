import { SparklesIcon } from "lucide-react";
import React from "react";

function SummaryForm({ data, onChange }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <SparklesIcon className="w-5 h-5 text-[#1F3D2B]" />
        <h2 className="text-lg font-semibold text-[#1F3D2B]">
          Professional Summary
        </h2>
      </div>

      {/* Helper text */}
      <p className="text-sm text-black/60 leading-relaxed">
        Write 2–4 concise sentences highlighting your background, strengths,
        and career goals. This section sets the first impression.
      </p>

      {/* AI enhancer hint */}
      <div className="flex items-center gap-2 text-xs text-black/50">
        <span className="px-2 py-0.5 rounded-full bg-[#F3EFE6] border border-black/10">
          AI Assist
        </span>
        <span>
          You can refine this later using AI suggestions
        </span>
      </div>

      {/* Textarea */}
      <textarea
        className="
          w-full
          min-h-[140px]
          resize-none
          rounded-lg
          border
          border-black/15
          bg-white
          p-3
          text-sm
          leading-relaxed
          text-black
          placeholder:text-black/40
          focus:outline-none
          focus:ring-2
          focus:ring-[#1F3D2B]/30
          focus:border-[#1F3D2B]
          transition
        "
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Example: Motivated Computer Science student with hands-on experience in full-stack development, seeking to build scalable and user-focused applications..."
      />

      {/* Character guidance */}
      <div className="text-xs text-black/40 text-right">
        Keep it clear, confident, and relevant
      </div>
    </div>
  );
}

export default SummaryForm;
