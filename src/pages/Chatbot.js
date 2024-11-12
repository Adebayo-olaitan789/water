import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import "./chatbot.css"; // Ensure this path is correct
import bot from "../icon/bot.svg";
import user1 from "../icon/user1.svg";
import publish from "../icon/publish.svg";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false); // New state for typing effect
  const [history, setHistory] = useState(() => {
    const savedHistory = sessionStorage.getItem("chatHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [chatOpened, setChatOpened] = useState(false);
  const chatHistoryRef = useRef(null);

  const makeRequest = async (questions) => {
    try {
      const response = await fetch(
        "https://python-app-779410445796.us-central1.run.app/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_VERTEX_API_KEY}`, // Add your API key
          },
          body: JSON.stringify({ input: questions }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching the response:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questions = input
      .split(/[\n,]+/)
      .map((q) => q.trim())
      .filter(Boolean);
    const newHistory = []; // Create new empty history for this session
    setInput("");
    setLoading(true);
    setTyping(true); // Start typing effect

    // Push user's question to history immediately
    questions.forEach((question) => {
      newHistory.push({
        question,
        response: "", // No response yet
        timestamp: new Date().toISOString(), // Add timestamp for user's question
      });
    });

    // Update history to show the question
    const updatedHistory = [...history, ...newHistory];
    setHistory(updatedHistory);
    sessionStorage.setItem("chatHistory", JSON.stringify(updatedHistory));

    try {
      const res = await makeRequest(questions);

      setTimeout(() => {
        // After bot's response, append the response to the history
        questions.forEach((question, index) => {
          const botResponse = res.response[index];
          newHistory[index] = {
            question, // Keep the user's question
            response: botResponse || "I couldn't find an answer to that.",
            timestamp: new Date().toISOString(), // Add timestamp for bot's response
          };
        });

        // Update history again with bot responses
        const finalUpdatedHistory = [...history, ...newHistory];
        setHistory(finalUpdatedHistory);
        sessionStorage.setItem(
          "chatHistory",
          JSON.stringify(finalUpdatedHistory)
        );

        setLoading(false);
        setTyping(false); // Stop typing effect after response is shown
      }, 5000); // Delay response by 5 seconds
    } catch (error) {
      console.error("Error fetching the response:", error);
      newHistory.forEach((question) => {
        question.response =
          "Sorry, there was an error processing your request.";
      });
      const finalUpdatedHistory = [...history, ...newHistory];
      setHistory(finalUpdatedHistory);
      sessionStorage.setItem(
        "chatHistory",
        JSON.stringify(finalUpdatedHistory)
      );
      setLoading(false);
      setTyping(false);
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (
      !chatOpened &&
      !history.find(
        (item) =>
          item.response ===
          "Hi , I’m Atmospheric Water Generator bot! How can I help you today?"
      )
    ) {
      const welcomeMessage = {
        question: "",
        response:
          "Hi , I’m Atmospheric Water Generator bot! How can I help you today.",
        timestamp: new Date().toISOString(),
      };
      const updatedHistory = [welcomeMessage, ...history];
      setHistory(updatedHistory);
      sessionStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
      setChatOpened(true);
    }
  }, [chatOpened, history]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-history" ref={chatHistoryRef}>
        {history.map((item, index) => (
          <div key={index} className="chatbot-history-item">
            {item.question && (
              <div className="chatbot-user-message">
                <img src={user1} alt="" className="icon" />
                <p className="you">{item.question}</p>
                {item.timestamp && (
                  <span className="chatbot-timestamp">
                    {new Date(item.timestamp).getTime() > Date.now() - 60000
                      ? "Just now" // Change to "Just now" if less than a minute ago
                      : formatDistanceToNow(new Date(item.timestamp), {
                          addSuffix: true,
                        })}
                  </span>
                )}
              </div>
            )}
            {item.response && (
              <div className="chatbot-bot-message">
                <img src={bot} alt="" className="icon" />
                <p className="pin">{item.response}</p>
                {item.timestamp && (
                  <span className="chatbot-timestamp">
                    {new Date(item.timestamp).getTime() > Date.now() - 60000
                      ? "Just now"
                      : formatDistanceToNow(new Date(item.timestamp), {
                          addSuffix: true,
                        })}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="chatbot-bot-message typing">
            <img src={bot} alt="" className="icon" />
            <p className="pin">
              <span className="typing-dots">...</span>
            </p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about AWG or anything else..."
          required
          className="chatbot-input"
          onKeyPress={handleKeyPress}
        />
        <img
          src={publish}
          alt="send"
          className="send-icon"
          onClick={input.trim() ? handleSubmit : null}
          style={{
            opacity: input.trim() ? 1 : 0.5,
            cursor: input.trim() ? "pointer" : "not-allowed",
          }}
        />
      </form>
    </div>
  );
};

export default Chatbot;
