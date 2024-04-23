import openai from "./openai.js";

const queryForOpenAI = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant for a car rental website. Give short and  concise response. Don't give too long response. ",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log("response", response.choices[0].message);

  return response?.choices[0]?.message;
};
export default queryForOpenAI;
