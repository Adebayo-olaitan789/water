import React, { useState, useEffect, useRef } from "react";
import HeaterTubeSimulation from "./HeaterTubeSimulation";
import ChatLayout from "./ChatLayout"; // Import ChatLayout instead of Chatbot
import drive from "../image/drive.jpg";
import lot from "../image/lot.jpg";

const Home = () => {
  const styles = {
    sectionBlock: {
      padding: "8px",
      margin: "0px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    backgroundImageSection: {
      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://cdn.hubblecontent.osi.office.net/m365content/publish/1c42e13b-df51-4083-a1ac-3d6eb6270bce/thumbnails/xxlarge.jpg")`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    contentColumn: {
      minWidth: "250px",
      maxWidth: "600px",
      wordBreak: "break-word",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#fff",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "30px",
      margin: "30px auto",
      textAlign: "center",
      maxWidth: "1200px", // limit container width to avoid stretching
    },
    image: {
      width: "100%",
      height: "auto",
      borderRadius: "4px",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
      margin: "20px auto",
      borderRadius: "4px",
    },
    footer: {
      backgroundColor: "#E0F7FA", // light blue background
      textAlign: "center",
      padding: "10px",
    },

    // Media query for mobile
    "@media (max-width: 768px)": {
      container: {
        flexDirection: "column", // Stack items vertically in mobile view
        padding: "10px", // Adjust padding for mobile
        maxWidth: "200px",
      },
      item: {
        flex: "1 1 100%", // Make each item take full width
        margin: "20px 0", // Adjust margin for mobile
      },
    },
  };
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat visibility
  const chatWindowRef = useRef(null); // Create a ref for the chat window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const pageStyles = {
    container: {
      position: "relative",
      padding: "20px",
    },
    chatIcon: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      backgroundColor: "#007BFF",
      color: "#fff",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      transition: "transform 0.3s",
      zIndex: 1000, // Ensure it's above other elements
    },
    chatWindow: {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      width: isMobile ? "90%" : "300px",
      height: "500px",
      border: "1px solid #007BFF",
      borderRadius: "8px",
      backgroundColor: "#fff",
      display: isChatOpen ? "block" : "none",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      overflow: "hidden",
      transition: "opacity 0.3s",
      opacity: isChatOpen ? 1 : 0,
      zIndex: 1000, // Ensure it's above other elements
    },
    chatHeader: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "10px",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
    },
    chatBody: {
      height: "calc(100% - 60px)",
      padding: "10px",
      overflowY: "auto",
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={{ ...styles.sectionBlock, ...styles.backgroundImageSection }}>
        <div style={styles.contentColumn}>
          <h1>Innovative Water Generation Solutions</h1>
          <h4>AI-Driven Adaptive Automated Control</h4>
          <button style={styles.button}>Explore More</button>
        </div>
      </div>
      {/* Feature Section */}
      <div style={styles.sectionBlock}>
        <div style={styles.container}>
          {/* First row */}

          <div style={{ flex: "1 1 45%", margin: "10px" }}>
            <img alt="IoT & Analytics" src={drive} style={styles.image} />

            <h2>AI-Driven Solutions</h2>
            <p>
              Experience cutting-edge AI-driven solutions for water generation
              and control. Enhance efficiency and sustainability with our
              innovative technology.
            </p>
            <button style={styles.button}>Learn More</button>
          </div>
          <div style={{ flex: "1 1 45%", margin: "10px" }}>
            <img alt="IoT & Analytics" src={lot} style={styles.image} />

            <h2>IoT & Analytics</h2>
            <p>
              Unlock the power of IoT and analytics in water generation. Monitor
              and optimize performance with real-time data insights.
            </p>
            <button style={styles.button}>Discover More</button>
          </div>

          <div style={{ flex: "1 1 45%", margin: "10px" }}>
            <img
              alt="Water Generator"
              src="https://cdn.hubblecontent.osi.office.net/m365content/publish/510cd0c7-7637-4523-b36c-d1052b604374/thumbnails/xxlarge.jpg"
              style={styles.image}
            />

            <h2>AI-Driven Solutions</h2>
            <p>
              Experience cutting-edge AI-driven solutions for water generation
              and control. Enhance efficiency and sustainability with our
              innovative technology.
            </p>
            <button style={styles.button}>Learn More</button>
          </div>
          <div style={{ flex: "1 1 45%", margin: "10px" }}>
            <img
              alt="IoT & Analytics"
              src="https://cdn.hubblecontent.osi.office.net/m365content/publish/6b817a0f-0710-47ba-92ba-8d1dd4959dca/thumbnails/xxlarge.jpg"
              style={styles.image}
            />
            <h2>IoT & Analytics</h2>
            <p>
              Unlock the power of IoT and analytics in water generation. Monitor
              and optimize performance with real-time data insights.
            </p>
            <button style={styles.button}>Discover More</button>
          </div>
        </div>
        {/* Second row */}
        <div style={styles.container}>
          <div style={{ flex: "1 1 30%", margin: "10px" }}>
            <img
              alt="Vertex AI"
              src="https://cdn.hubblecontent.osi.office.net/m365content/publish/3c4bc6e4-94c1-471b-99c1-0ad6799b2e28/thumbnails/xxlarge.jpg"
              style={styles.image}
            />
            <h3>Vertex AI Integration</h3>
            <p>
              Seamlessly integrate Vertex AI for advanced machine learning
              capabilities. Optimize your water generation process with
              state-of-the-art AI technology.
            </p>
          </div>
          <div style={{ flex: "1 1 30%", margin: "10px" }}>
            <img
              alt="Cloud Run"
              src="https://cdn.hubblecontent.osi.office.net/m365content/publish/1a2be08c-6def-4ea3-a95e-dc8b8c52757f/thumbnails/xxlarge.jpg"
              style={styles.image}
            />
            <h3>Cloud Run Deployment</h3>
            <p>
              Leverage Cloud Run for scalable and secure deployment of your
              water generation system. Ensure reliability and flexibility in
              your operations.
            </p>
          </div>
          <div style={{ flex: "1 1 30%", margin: "10px" }}>
            <img
              alt="Cloud Spanner"
              src="https://cdn.hubblecontent.osi.office.net/m365content/publish/0ad81cbe-1c54-427d-b94d-ba136fcbd3bc/thumbnails/xxlarge.jpg"
              style={styles.image}
            />
            <h3>Cloud Spanner Database</h3>
            <p>
              Utilize Cloud Spanner for a globally distributed, horizontally
              scalable database. Ensure high availability and consistency in
              your data management.
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer style={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Water Generator. All rights
          reserved.
        </p>
      </footer>
      <ChatLayout /> {/* Replacing Chatbot with ChatLayout */}
    </div>
  );
};

export default Home;
