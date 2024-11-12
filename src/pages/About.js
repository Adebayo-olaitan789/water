import React from "react";
import ChatLayout from "./ChatLayout";
import source from "../image/source.jpg";
import gen from "../image/gen.png";
import stab from "../image/stab.jpg";
import large from "../image/large.jpg";
import small from "../image/small.jpg";
import medium from "../image/medium.jpg";

const About = () => {
  const pageStyles = {
    container: {
      backgroundColor: "#000000",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    column: {
      width: "100%",
      textAlign: "center",
      marginBottom: "20px",
    },
    image: {
      width: "80%",
      height: "400px",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "15px 30px",
      border: "none",
      cursor: "pointer",
      marginBottom: "20px",
      borderRadius: "5px",
      fontSize: "16px",
    },
    line: {
      color: "#ffffff",
      fontSize: "24px",
    },
    let: {
      color: "#ffffff",
      fontSize: "16px",
    },
    aboutSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
    },
    aboutImage: {
      width: "90%",
      borderRadius: "12px",
      marginBottom: "20px",
    },
    aboutText: {
      textAlign: "left",
      fontSize: "16px",
      lineHeight: "1.5",
      color: "white",
      padding: "0 10px",
    },
    mark: {
      border: "none",
      fontSize: "28px",
      marginBottom: "10px",
      color: "white",
    },
    footer: {
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
    },
    footerItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "80%",
      marginBottom: "20px",
    },
    footerImage: {
      width: "80%", // Adjust for better responsiveness
      marginBottom: "10px",
    },
    large: {
      color: "#000000",
      fontSize: "20px",
      marginBottom: "10px",
      border: "none",
    },
    para: {
      color: "#000000",
      fontSize: "14px",
      textAlign: "center",
      width: "250px",
    },
  };

  return (
    <div style={pageStyles.container}>
      <div style={pageStyles.column}>
        <div style={pageStyles.aboutSection}>
          <img style={pageStyles.aboutImage} src={source} alt="source" />
          <h2 style={pageStyles.mark}>About Us</h2>
          <p style={pageStyles.aboutText}>
            Discover our innovative water generator that utilizes cutting-edge
            technology to provide sustainable solutions for clean water
            production. The innovative generator is based on a revolutionary
            formula. Professor Thomas Brauner of the University of Stavanger in
            2018 confirmed the physical law and functionality of the device. In
            2019 programmer Olanrewaju Tope Faboyin started working on the
            programming of the device. The software application for automation
            and calculation is written in Python. Copyrights of the software are
            reserved in Azerbaijan. The method and desine of the device in on
            the second patenting expertise stage. In cooperation with Azerbaijan
            University of Architecture and Construction, Pfof. Nurmemmed Mamedov
            we work on product development and supervision of mass production.
          </p>
          <button style={pageStyles.button}>Learn More</button>

          <img style={pageStyles.aboutImage} src={stab} alt="stab" />
          <h2 style={pageStyles.mark}>Our Mission</h2>
          <p style={pageStyles.aboutText}>
            We believe in a world where everyone has access to clean and safe
            water. Empowering communities with sustainable water solutions
            through innovation and technology. Our activities are aimed at
            providing and promoting quality water from atmospheric water
            generators all around the world.
          </p>
          <button style={pageStyles.button}>Learn More</button>
        </div>
      </div>

      <div style={pageStyles.column}>
        <img
          style={pageStyles.image}
          src="https://cdn.hubblecontent.osi.office.net/m365content/publish/445c3db4-15ec-46ee-804a-792a3a759f88/thumbnails/xxlarge.jpg"
          alt="AI-Driven Solutions"
        />
        <h2 style={pageStyles.line}>Our Vision</h2>
        <p style={pageStyles.let}>
          Leading the way in AI-driven solutions for water generation, ensuring
          a brighter future for all.
        </p>
        <button style={pageStyles.button}>Explore</button>
      </div>

      <ChatLayout />
      <div style={pageStyles.footer}>
        <div style={pageStyles.footerItem}>
          <img
            style={pageStyles.footerImage}
            src={large}
            alt="IoT & Analytics"
          />
          <h2 style={pageStyles.large}>IoT & Analytics</h2>
          <p style={pageStyles.para}>
            Leveraging IoT and analytics to optimize water generation processes
            and enhance efficiency.
          </p>
        </div>
        <div style={pageStyles.footerItem}>
          <img
            style={pageStyles.footerImage}
            src={small}
            alt="Authentication & Security"
          />
          <h2 style={pageStyles.large}>Authentication & Security</h2>
          <p style={pageStyles.para}>
            Ensuring secure access and protection of data through advanced
            authentication and security measures.
          </p>
        </div>
        <div style={pageStyles.footerItem}>
          <img
            style={pageStyles.footerImage}
            src={medium}
            alt="Cloud Technologies"
          />
          <h2 style={pageStyles.large}>Cloud Technologies</h2>
          <p style={pageStyles.para}>
            Leveraging cutting-edge cloud technologies for seamless operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
