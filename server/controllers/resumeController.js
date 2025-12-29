import imagekit from "../lib/imagekit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';
//Function to create Resume
export const createResume = async(req,res)=>{
    try {
      const userId = req.userId;
      const {title} = req.body;
      const newResume = await Resume.create({userId,title})
      return res.status(201).json({newResume});

    } catch (error) {
      return res.status(400).json({message: "Error"})
    }
}


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

    const resume = await Resume.findOne({
      _id: resumeId,
      userId,
    }).select("-__v -createdAt -updatedAt");

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json(resume);
  } catch (error) {
    return res.status(400).json({ message: "Error fetching resume" });
  }
};



// get resume by id public

export const getPublicResumeById = async(req,res)=>{
  try {
    const {resumeId}  = req.params;
    const resume = await Resume.findOne({public:true,_id:resumeId});

    return res.status(200).josn({resume});
  } catch (error) {
    return res.status(400).json({message:"Error"})
  }
}

// function for updating resume

export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);

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
