// Contact.js
import React from "react";
import "./Contact.css"; // Import the CSS file
import ChatLayout from "./ChatLayout"; // Import the ChatLayout component

const Contact = () => {
  const handleContactClick = () => {
    window.location.href = "mailto:Aksunnhordvik@gmail.com";
  };

  return (
    <div className="container">
      <div className="column">
        <img
          className="image"
          src="https://cdn.hubblecontent.osi.office.net/m365content/publish/12f59cde-f112-41fd-9345-de1d2b19fd56/thumbnails/xxlarge.jpg"
          alt="Innovative Water Generator"
        />
        <h3>About Us</h3>
        <p>
          Discover our innovative water generator that utilizes cutting-edge
          technology to provide sustainable solutions for clean water
          production.
        </p>
      </div>
      <div className="column">
        <img
          className="image"
          src="https://cdn.hubblecontent.osi.office.net/m365content/publish/ca318f2b-c537-42ea-9ad8-1a33ec2f0fa7/thumbnails/xxlarge.jpg"
          alt="AI-Driven Control"
        />
        <h3>Our Vision</h3>
        <p>
          Empowering communities with AI-driven control systems for efficient
          water generation and distribution.
        </p>
      </div>
      <div className="column">
        <img
          className="image"
          src="https://cdn.hubblecontent.osi.office.net/m365content/publish/ef37c1bd-526b-4db6-911e-447a78a1ae9b/thumbnails/xxlarge.jpg"
          alt="IoT & Analytics"
        />
        <h3>IoT & Analytics</h3>
        <p>
          Explore our IoT and analytics functions that ensure optimal
          performance and data-driven insights for water management.
        </p>
      </div>
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>Feel free to reach out to us for more information or inquiries.</p>
        <button className="button" onClick={handleContactClick}>
          Get in Touch
        </button>
      </div>
      {/* Chat Layout */}
      <ChatLayout /> {/* Use the ChatLayout component */}
    </div>
  );
};

export default Contact;
