import React from "react";
import { dummyResumeData } from "../assets/assets";
import { Trash2, Edit, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [allResumes, setAllResumes] = React.useState([]);
  const [isCreateResume, setIsCreateResume] = React.useState(false);
  const [resumeTitle, setResumeTitle] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    setAllResumes(dummyResumeData);
  }, []);

  const handleCreateResume = (e) => {
    e.preventDefault();

    // later you’ll replace 123 with real ID
    navigate("/app/builder/123");

    setResumeTitle("");
    setIsCreateResume(false);
  };

  return (
    <div className="min-h-screen bg-[#F3EFE6] px-6 py-10">

      {/* Top actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">

        {/* Create Resume */}
        <div
          onClick={() => setIsCreateResume(true)}
          className="bg-white rounded-lg border border-black/10 shadow-sm p-6 flex items-start gap-4 cursor-pointer hover:shadow-md transition min-h-[160px]"
        >
          <div className="w-12 h-12 rounded-md bg-[#1F3D2B]/10 flex items-center justify-center shrink-0">
            <span className="text-3xl text-[#1F3D2B]">+</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1F3D2B]">
              Create Resume
            </p>
            <p className="text-sm text-[#1F3D2B]/70 mt-1">
              Start building a resume from scratch
            </p>
          </div>
        </div>

        {/* Upload Resume */}
        <div className="bg-white rounded-lg border border-black/10 shadow-sm p-6 flex items-start gap-4 cursor-pointer hover:shadow-md transition min-h-[160px]">
          <div className="w-12 h-12 rounded-md bg-[#1F3D2B]/10 flex items-center justify-center shrink-0">
            <span className="text-2xl text-[#1F3D2B]">☁</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1F3D2B]">
              Upload Existing
            </p>
            <p className="text-sm text-[#1F3D2B]/70 mt-1">
              Upload and enhance your resume
            </p>
          </div>
        </div>
      </div>

      {/* Create Resume Modal */}
      {isCreateResume && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setIsCreateResume(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-[360px] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <X
              className="absolute top-4 right-4 w-5 h-5 cursor-pointer text-[#1F3D2B]/70 hover:text-[#1F3D2B]"
              onClick={() => setIsCreateResume(false)}
            />

            <h3 className="text-lg font-semibold text-[#1F3D2B] mb-4">
              Create Resume
            </h3>

            <form onSubmit={handleCreateResume}>
              <input
                type="text"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="Enter resume title"
                className="w-full border border-black/20 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/40"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#1F3D2B] text-white py-2 rounded-md hover:bg-[#173022] transition"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Previous resumes */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-[#1F3D2B] mb-4">
          Your Resumes
        </h2>

        {allResumes.length === 0 ? (
          <p className="text-[#1F3D2B]/70">
            No resumes created yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allResumes.map((resume, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-black/10 shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <p className="text-lg font-semibold text-[#1F3D2B]">
                    {resume.title}
                  </p>

                  <div className="flex items-center gap-2">
                    <button className="p-1 rounded-md hover:bg-green-100 transition">
                      <Edit className="w-5 h-5 text-green-600" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-red-100 transition">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-[#1F3D2B]/70 mt-1">
                  Last updated:{" "}
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
