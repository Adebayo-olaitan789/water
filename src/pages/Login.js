import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import Dashboard from './Dashboard'; // Ensure this is correctly imported
import Chatbot from "./Chatbot"; // Ensure this path is correct based on your project structure


const CLIENT_ID = '779410445796-9m6ip62p95thpt63gs6369ojo45d46a9.apps.googleusercontent.com';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const start = () => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: CLIENT_ID,
          scope: 'profile email',
        }).then(() => {
          console.log('Google API initialized');
        }).catch(error => {
          console.error('Error initializing Google API:', error);
        });
      });
    };

    start();
  }, []);
  
   const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat visibility
  const chatWindowRef = useRef(null); // Create a ref for the chat window
   const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  
   const pageStyles = {
    container: {
      display: "flex",
      justifyContent: isMobile ? "center" : "space-between",
      padding: "20px",
      flexWrap: "wrap",
      flexDirection: isMobile ? "column" : "row",
    },
    column: {
      width: isMobile ? "100%" : "48%",
      textAlign: "center",
      marginBottom: "20px",
    },
    image: {
      width: "100%",
      height: "auto",
      borderRadius: "8px",
    },
    button: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
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
    },
    chatWindow: {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      width: "300px",
      height: "500px", // Updated height from 400px to 500px
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

  const handleGoogleLogin = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile();
      console.log('User Info:', profile);

      const id_token = googleUser.getAuthResponse().id_token;
      console.log('ID Token:', id_token);

      localStorage.setItem('oauth_token', id_token);
      localStorage.setItem('username', profile.getName());
      localStorage.setItem('useremail', profile.getEmail());
      localStorage.setItem('userphoto', profile.getImageUrl());

      // Navigate to dashboard after successful login
      navigate('/dashboard'); // Change this to your dashboard route

      // window.location.reload(); // Remove this line to avoid reloading
    }).catch(error => {
      console.error('Error during Google OAuth login:', error);
      alert('Failed to login. Please try again.');
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ wordBreak: 'break-word', flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: '300px', margin: '50px 0', textAlign: 'center', fontSize: '25px' }}>
        <h2>Get Started</h2>
        <p>Start your journey with our innovative water generator system. Experience the power of automation and sustainability.</p>
      </div>
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <img src={`${process.env.PUBLIC_URL}/1.JPG`} alt="Water Generator" style={{ maxWidth: '100%', width: '100%', height: 'auto', borderRadius: '8px' }} />
      </div>
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', padding: '20px', textAlign: 'center' }}>
        <h2>Authentication &amp; Login</h2>
        <p>Secure your water generator system with advanced authentication methods. Login to access real-time data and control functionalities.</p>
        <button onClick={handleGoogleLogin} type="button" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', alignSelf: 'center' }}>
          Login Now with Google
        </button>
      </div>
	  
	    {/* Chat Icon */}
      <div style={pageStyles.chatIcon} onClick={toggleChat}>
        💬
      </div>
	  
	  
	  {/* Chat Window with Chatbot */}
      <div style={pageStyles.chatWindow} ref={chatWindowRef}>
        {" "}
        {/* Attach ref here */}
        <div style={pageStyles.chatHeader}>Chat with Us</div>
        <Chatbot /> {/* Integrate Chatbot component */}
      </div>
	
    </div>
  );
}

export default Login;
