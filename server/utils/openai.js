import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPEN_AI_KEY) {
  throw new Error("Open API key is not set");
}

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export default openai;
