import React, { useState, useEffect, useRef } from "react";
import Chatbot from "./Chatbot"; // Ensure this path is correct based on your project structure

const ChatLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat visibility
  const [showTooltip, setShowTooltip] = useState(false); // State to control tooltip visibility
  const chatWindowRef = useRef(null); // Create a ref for the chat window

  // Check if the screen is mobile or desktop
  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", checkMobileScreen);
    checkMobileScreen();

    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);

  // Close chat window if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target) &&
        isChatOpen
      ) {
        setIsChatOpen(false); // Close the chat if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, [isChatOpen]);

  const pageStyles = {
    chatIconContainer: {
      position: "fixed",
      bottom: "0px",
      right: "10px",
      cursor: "pointer",
    },
    chatIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#007BFF",
      color: "#fff",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      position: "relative",
    },
    tooltip: {
      position: "absolute",
      bottom: "50px", // Position the tooltip above the icon
      right: "30px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "4px",
      whiteSpace: "nowrap",
      fontSize: "12px",
      zIndex: 10,
      opacity: showTooltip ? 1 : 0, // Show/hide tooltip
      transition: "opacity 0.2s ease-in-out",
    },
    chatWindow: {
      position: "fixed",
      bottom: "0px",
      right: "10px",
      width: "300px",
      height: "500px",
      border: "1px solid #007BFF",
      borderRadius: "8px",
      backgroundColor: "#fff",
      display: isChatOpen ? "block" : "none",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      overflow: "hidden",
    },
    chatHeader: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "10px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat Icon with Custom Tooltip */}
      <div
        style={pageStyles.chatIconContainer}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={toggleChat}
      >
        <div style={pageStyles.chatIcon}>
          💬
          {/* Tooltip */}
          <div style={pageStyles.tooltip}>Open chat window</div>
        </div>
      </div>

      {/* Chat Window with Chatbot */}
      <div style={pageStyles.chatWindow} ref={chatWindowRef}>
        <div style={pageStyles.chatHeader}>Chat with Us</div>
        <Chatbot /> {/* Integrate Chatbot component */}
      </div>
    </>
  );
};

export default ChatLayout;
