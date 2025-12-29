import { OpenAI } from "openai/client.js";

const ai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.GEMINI_BASE_URL,


});

export default ai