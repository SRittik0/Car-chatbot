import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

function B() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch bot response from OpenAI API
  const fetchBotResponse = async (userInput) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a chatbot." },
              { role: "user", content: userInput },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `OpenAI API request failed with status: ${response.status}`
        );
      }

      const data = await response.json();
      return (
        data.choices[0]?.message?.content ||
        "Sorry, I could not understand that."
      );
    } catch (error) {
      console.error("Error handling bot response:", error.message);
      throw error;
    }
  };

  // Function to handle user messages
  // Function to handle user messages
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: inputMessage, position: "right" },
    ]);
    setLoading(true);

    try {
      // Fetch bot response from OpenAI API
      const botResponse = await fetchBotResponse(inputMessage);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: botResponse, position: "left" },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error.message);
    } finally {
      setLoading(false);
    }

    // Clear input field
    setInputMessage("");
  };

  // Function to handle the initial bot welcome message
  const handleWelcomeMessage = async () => {
    try {
      // Fetch bot response from OpenAI API for the welcome message
      const welcomeMessage = await fetchBotResponse("Hello");
      setChatMessages([
        { type: "bot", text: welcomeMessage, position: "left" },
      ]);
    } catch (error) {
      console.error("Error fetching welcome message:", error.message);
    }
  };

  useEffect(() => {
    // Trigger the welcome message when the component mounts
    handleWelcomeMessage();
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatMessages]);

  return (
    <div className="flex flex-col h-screen justify-between bg-gray-100 p-4">
      <div
        className="flex-1  flex flex-col overflow-y-auto border border-gray-300 p-4 mb-4"
        id="chat-container"
      >
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`w-fit  file:mb-3 p-3 rounded mt-4  ${
              message.position === "right"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start "
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && (
          <div className="w-fit p-2 rounded bg-gray-300 text-gray-700 self-start mt-2 mb-4">
            Bot is Typing...
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded border border-gray-300"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded cursor-pointer ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default B;
