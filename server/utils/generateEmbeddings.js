import openai from "./openai.js";

const generateEmbedding = async (inputText) => {
  try {
    const vectorEmbedding = await openai.embeddings.create({
      input: inputText,
      model: "text-embedding-3-small",
    });
    const embedding = vectorEmbedding.data[0].embedding;
    return embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    return null;
  }
};

export default generateEmbedding;
