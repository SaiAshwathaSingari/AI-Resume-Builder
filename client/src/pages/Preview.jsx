import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../configs/api.js';
import ResumePreview from "../components/ResumePreview";

export const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(false);

  const loadResume = async () => {
    try {
      setIsLoading(true);
      // Ensure you are calling the public route
      const { data } = await api.get(`/api/resumes/public/${resumeId}`);
      if (data.resume) {
        setResumeData(data.resume);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (resumeId) {
      loadResume();
    }
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCF9]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1F3D2B]/20 border-t-[#1F3D2B]" />
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF9] p-4 text-center">
        <h1 className="text-2xl font-serif text-[#1F3D2B] mb-2">Resume Not Found</h1>
        <p className="text-gray-500">This resume is either private or does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3EFE6] py-10 px-4 flex justify-center">
      <div className="bg-white shadow-2xl origin-top transition-all" style={{ width: "794px", minHeight: "1123px" }}>
        <ResumePreview 
          data={resumeData} 
          template={resumeData.template} 
          accentColor={resumeData.accent_color} 
        />
      </div>
    </div>
  )
}

export default Preview;