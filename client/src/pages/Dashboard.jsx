import React from "react";
import { dummyResumeData } from "../assets/assets";
import { Trash2, Edit, X, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [allResumes, setAllResumes] = React.useState([]);
  const [isCreateResume, setIsCreateResume] = React.useState(false);
  const [resumeTitle, setResumeTitle] = React.useState("");
  const [isUploadResume, setIsUploadResume] = React.useState(false);

  const [newResumeTitle, setNewResumeTitle] = React.useState("");

  const [uploadedFile, setUploadedFile] = React.useState(null);
  
  const [editPopup, setEditPopup] = React.useState(false);
  
  const navigate = useNavigate();

  const [editResume, setEditResume] = React.useState(null);
  
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

  const handleUploadResume = (e) => {
    e.preventDefault();
    navigate("/app/builder/123");
    setResumeTitle("");
    setIsUploadResume(false);
  }
  const handleEditResume = (e,title) => {
    e.preventDefault();
    // logic to edit resume title
    setEditPopup(false);
    allResumes.forEach((resume)=>{
      if(resume._id===editResume._id){
        resume.title=title;
      } 
  });
  setAllResumes([...allResumes]);
  }

  const handleDeleteResume = (resume) => {
    // logic to delete resume
   
    const ok = window.confirm("Are you sure you want to delete this resume?");
    if (!ok) return;

    const filteredResumes = allResumes.filter((resume1) => resume1._id !== resume._id);
    setAllResumes(filteredResumes);
  }

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
        <div onClick={()=>setIsUploadResume(true)} className="bg-white rounded-lg border border-black/10 shadow-sm p-6 flex items-start gap-4 cursor-pointer hover:shadow-md transition min-h-[160px]">
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
    {/* Pop-up upload resume modal */}

   {isUploadResume && (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={() => setIsUploadResume(false)}
  >
    <div
      className="bg-white rounded-xl shadow-lg w-[360px] p-6 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <X
        className="absolute top-4 right-4 w-5 h-5 cursor-pointer text-[#1F3D2B]/70 hover:text-[#1F3D2B]"
        onClick={() => setIsUploadResume(false)}
      />

      <h3 className="text-lg font-semibold text-[#1F3D2B] mb-4">
        Upload Resume
      </h3>

      <form onSubmit={handleUploadResume}>
        {/* Title */}
        <input
          type="text"
          value={resumeTitle}
          onChange={(e) => setResumeTitle(e.target.value)}
          placeholder="Enter resume title"
          className="w-full border border-black/20 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]/40"
          required
        />

        {/* File upload */}
        <label className="block border-2 border-dashed border-black/20 rounded-md p-4 text-center cursor-pointer hover:bg-[#1F3D2B]/5 transition">
          <Upload className="w-6 h-6 mx-auto text-[#1F3D2B]/70 mb-2" />
          <p className="text-sm text-[#1F3D2B]/70">
            Click to upload (.pdf, .doc, .docx)
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setUploadedFile(e.target.files[0])}
          />
        </label>

        {/* File name */}
        {uploadedFile && (
          <p className="text-sm text-green-600 mt-2">
            File selected: {uploadedFile.name}
          </p>
        )}

        <button
          type="submit"
          disabled={!uploadedFile}
          className="w-full mt-4 bg-[#1F3D2B] text-white py-2 rounded-md hover:bg-[#173022] transition disabled:opacity-50"
        >
          Upload Resume
        </button>
      </form>
    </div>
  </div>
)}




      {/* Pop-up Create Resume Modal */}
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

      

      {/* Edit Resume Popup */}
      {editPopup && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setEditPopup(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-[360px] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <X
              className="absolute top-4 right-4 w-5 h-5 cursor-pointer text-[#1F3D2B]/70 hover:text-[#1F3D2B]"
              onClick={() => setEditPopup(false)}
            />

            <h3 className="text-lg font-semibold text-[#1F3D2B] mb-4">
              Edit Resume's Title
            </h3>

            <form onSubmit={(e) => handleEditResume(e, newResumeTitle)}>
              <input
                type="text"
                value={newResumeTitle}
                onChange={(e) => setNewResumeTitle(e.target.value)}
              
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
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                key={index}
                className="bg-white rounded-lg border border-black/10 shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <p className="text-lg font-semibold text-[#1F3D2B]">
                    {resume.title}
                  </p>

                  <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">
                    <button className="p-1 rounded-md hover:bg-green-100 transition">
                      <Edit onClick={() => {setEditPopup(true); setEditResume(resume); setNewResumeTitle(resume.title);}} className="w-5 h-5 text-green-600" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-red-100 transition">
                      <Trash2 onClick={() => {handleDeleteResume(resume);}} className="w-5 h-5 text-red-600" />
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
