import openai from "./openai.js";

const evaluateIfDatabaseRequired = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "You are a virtual assistant designed for a car rental website. Your role is to determine whether the query is related to a car. Your responses should be limited to either 'true' or 'false'. Return 'true' if the query could refer to car ",
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
export default evaluateIfDatabaseRequired;
