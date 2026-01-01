import { SparklesIcon, Wand2 } from "lucide-react";
import React, { useState } from "react";
import api from "../configs/api";
import { useSelector } from "react-redux";


function SummaryForm({ data, onChange }) {
  
  const {token} = useSelector(state=>state.auth)
  const [isGenerating,setisGenerating] = useState(false)
  

  const handleAiEnhance = async() => {
    // Logic for AI enhancement will go here later
    try {
      setisGenerating(true)
      const prompt = `enhance my cv no job description just do it with the data availbale or make on your own ${data}`

      const res = await api.post('/api/ai/enhance-pro-sum',
        {
          userContent: prompt
        },
        {
          headers: { Authorization: token }
        }
      )

      console.log(res.data.enhancedContent)
      onChange(res.data.enhancedContent)

    } catch (error) {
      console.log(error)
    }finally{
      setisGenerating(false)
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header & AI Button Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#1F3D2B]/5 rounded-lg">
            <SparklesIcon className="w-5 h-5 text-[#1F3D2B]" />
          </div>
          <h2 className="text-xl font-serif font-semibold text-[#1F3D2B]">
            Professional Summary
          </h2>
        </div>

        {/* PRO AI BUTTON */}
       <button
  onClick={handleAiEnhance}
  disabled={isGenerating} // Stop multiple clicks
  className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-tr from-[#1F3D2B] to-[#2d5a40] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#1F3D2B]/20 hover:shadow-xl hover:shadow-[#1F3D2B]/30 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-wait"
>
  {isGenerating ? (
    // The Spinner
    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  ) : (
    // The Wand Icon
    <Wand2 size={14} className="group-hover:rotate-12 transition-transform" />
  )}

  <span>{isGenerating ? "Refining..." : "AI Enhance"}</span>

  {/* Subtle glow effect - hide it while generating */}
  {!isGenerating && (
    <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
  )}
</button>
      </div>

      {/* Helper text */}
      <p className="text-sm text-black/50 leading-relaxed max-w-md">
        Write 2–4 concise sentences highlighting your background. This is the first thing recruiters read.
      </p>

      {/* Textarea Container */}
      <div className="relative group">
        <textarea
          className="
            w-full
            min-h-[180px]
            resize-none
            rounded-[24px]
            border
            border-black/10
            bg-white/50
            backdrop-blur-sm
            p-5
            text-sm
            leading-relaxed
            text-black
            placeholder:text-black/20
            focus:outline-none
            focus:ring-4
            focus:ring-[#1F3D2B]/5
            focus:border-[#1F3D2B]
            focus:bg-white
            transition-all
            duration-300
          "
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Example: Motivated Computer Science student with hands-on experience in full-stack development..."
        />
        
        {/* Decorative corner accent */}
        <div className="absolute bottom-4 right-4 text-[10px] font-black uppercase tracking-widest text-black/20 group-focus-within:text-[#1F3D2B]/40 transition-colors">
          {data?.length || 0} Characters
        </div>
      </div>

      {/* Bottom Guidance */}
      <div className="flex items-center gap-3 px-2">
        <div className="h-[1px] flex-1 bg-black/5" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">
          Clear • Confident • Relevant
        </span>
        <div className="h-[1px] flex-1 bg-black/5" />
      </div>
    </div>
  );
}

export default SummaryForm;