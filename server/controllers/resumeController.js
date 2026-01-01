import imagekit from "../lib/imagekit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';
//Function to create Resume
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({ resume: newResume });
  } catch (error) {
    console.error("CREATE RESUME ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



//Function to Delete Resume

export const deleteResume = async(req,res)=>{
  try {
    const userId = req.userId;
    const {resumeId} = req.params;

    await Resume.findOneAndDelete({userId,_id: resumeId})
 return res.status(201).json({message: "Deletion Successfull!"});
  } catch (error) {
     return res.status(400).json({message: "Error"})
  }
}


//Function to get user resume by Id

export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);


    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });

  } catch (error) {
    return res.status(400).json({ message: "Error fetching resume" });
  }
};



// get resume by id public

// --- Inside resumeController.js ---
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // THIS IS LIKELY THE PROBLEM:
    if (resume.public === false) {
      return res.status(400).json({ message: "This resume is private" });
    }

    res.status(200).json({ resume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function for updating resume

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;
    if(typeof resumeData === 'string'){
      resumeDataCopy = await JSON.parse(resumeData)
    }else{
      resumeDataCopy = structuredClone(resumeData)
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: `resume-${Date.now()}.png`,
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personal_info.image = response.url;

      fs.unlinkSync(image.path); // cleanup
    }

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      resumeDataCopy,
      { new: true }
    );

    return res.status(200).json({ message: "Saved Successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};
