import ai from "../lib/ai.js";
import Resume from "../models/Resume.js";

/* ============================
   Enhance Professional Summary
============================ */
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Invalid information" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert in resume writing.
Enhance the professional summary into 1–2 ATS-friendly sentences.
Return ONLY the text. No explanations.`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("SUMMARY ERROR 👉", error);
    return res.status(400).json({ message: "Error" });
  }
};

/* ============================
   Enhance Job Description
============================ */
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Invalid information" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert in resume writing.
Enhance the job description into 1–2 ATS-friendly sentences.
Return ONLY the text.`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("JOB DESC ERROR 👉", error);
    return res.status(400).json({ message: "Error" });
  }
};

/* ============================
   Upload Resume & Extract Data
============================ */
export const uploadResumeToAi = async (req, res) => {
  try {
    const { resumeContent, title } = req.body;
    const userId = req.userId;

    if (!resumeContent) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const systemPrompt = `
You are an expert resume parser.

Rules:
- Return ONLY valid JSON.
- No markdown, no text outside JSON.
- Every field must exist.
- Use empty strings "" or empty arrays [] if missing.

JSON format:
{
  "professional_summary": "string",
  "skills": ["string"],
  "personal_info": {
    "image": "",
    "full_name": "string",
    "profession": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "website": "string"
  },
  "experience": [
    {
      "company": "string",
      "position": "string",
      "start_date": "string",
      "end_date": "string",
      "description": "string",
      "is_current": false
    }
  ],
  "projects": [
    {
      "name": "string",
      "type": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "gpa": "string"
    }
  ]
}
`;

    const userPrompt = `Extract resume data from the following text:\n\n${resumeContent}`;

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const enhancedContent = response.choices[0].message.content;
    console.log("AI OUTPUT 👉", enhancedContent);

    let parsedData;
    try {
      parsedData = JSON.parse(enhancedContent);
    } catch (err) {
      return res.status(400).json({ message: "AI parsing failed" });
    }

    const normalizedData = {
      professional_summary: parsedData.professional_summary || "",
      skills: parsedData.skills || [],
      personal_info: parsedData.personal_info || {},
      experience: parsedData.experience || [],
      projects: parsedData.projects || parsedData.project || [],
      education: parsedData.education || [],
    };

    const newResume = await Resume.create({
      userId,
      title,
      ...normalizedData,
    });

    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    console.error("UPLOAD RESUME ERROR 👉", error);
    return res.status(400).json({ message: "Error" });
  }
};
