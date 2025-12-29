import ai from "../lib/ai.js";


//function to enhance a resume's professional summary
export const enhanceProfessionalSummary = async(req,res)=>{
  try {
    const {userContent} = req.body;
    if(!userContent){
      return res.status(400).json({message:"Invalid information"});
      }

         const response = await ai.chat.completions.create({
    model: process.env.GEMINI_MODEL,
    messages: [
        {   role: "system",
            content: `You are an expert in resume writing.
Your task is to enhance the professional summary of a resume.
The summary should be 1–2 sentences highlighting key skills,
experience, and career objectives.
Make it compelling and ATS-friendly.
Only return the text, no options or anything else.`, 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
});
const enhancedContent = response.choices[0].message.content
return res.status(200).json({enhancedContent})
  
  } catch (error) {
    return res.status(400).json({message: "Error"})
  }
}

//function to enhacne job description

export const enhanceJobDescription = async(req,res)=>{
      try {
    const {userContent} = req.body;
    if(!userContent){
      return res.status(400).json({message:"Invalid information"});
      }

         const response = await ai.chat.completions.create({
    model: process.env.GEMINI_MODEL,
    messages: [
        {   role: "system",
            content: `You are an expert in resume writing.
Your task is to enhance the Job Description of a resume.
The summary should be 1–2 sentences highlighting key skills,
experience, and career objectives.
Make it compelling and ATS-friendly.
Only return the text, no options or anything else.`, 
        },
        {
            role: "user",
            content: userContent,
        },
    ],
});
const enhancedContent = response.choices[0].message.content
return res.status(200).json({enhancedContent})
  
  } catch (error) {
    return res.status(400).json({message: "Error"})
  }
}


//function to upload resume to ai to get teh text extracted

export const uploadResumeToAi = async(req,res)=>{
   try {
    const {resumeContent,title} = req.body;
    const userId = req.userId;
    if(!resumeContent){
      return res.status(400).json({message:"Missing Required Feilds"});
      }
      const systemPrompt = "You are an expert AI agent to extract data from resume."
      const userPrompt = `extract data from resum ${resumeContent}
      Provide data in the following JSON format with no additional text before or after:

     
      
          professional_summary: {
            type: String,
            default: "",
          },
      
          skills: [
            {
              type: String,
            },
          ],
      
         personal_info:
         {
          image :{type: String, default: ''},
          full_name : {type: String, default: ''},
          profession: {type: String, default: ''},
          email : {type: String, default: ''},
          phone : {type:String, default:'' },
          location : {type:String,default:''},
          linkedin: {type:String,default:''},
          website : {type:String,default:''},
         },
         experience: [
          {
            company: {type: String},
            position: {type: String},
            start_date: {type: String},
            end_date: {type: String},
            description: {type: String},
            is_current : {type: Boolean},
          }
         ],
         project: [
          {
             name : {type:String},
             type : {type:String},
             description : {type:String},
          }
         ],
         education: [
          {
            institution: {type:String},
            degree: {type:String},
            field: {type:String},
            gpa: {type:String},
            
          }
         ]
            },{timestamps: true,minimize: false});
      `
         const response = await ai.chat.completions.create({
    model: process.env.GEMINI_MODEL,
    messages: [
        {   role: "system",
            content: systemPrompt,
        },
        {
            role: "user",
            content: userPrompt,
        },
    ],
    response_format: {type: `json_object`}
});
const enhancedContent = response.choices[0].message.content
const parsedData = JSON.parse(enhancedContent)
const newResume = await Resume.create({userId,title,...parsedData });
return res.status(200).json({resumeId: newResume._id})

  
  } catch (error) {
    return res.status(400).json({message: "Error"})
  }
}