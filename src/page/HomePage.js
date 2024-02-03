import React from "react";
import efreiHomePage from "../asset/efrei_homepage.jpeg";
import "../style/HomePage.css";

const HomePage = () => {
  return (
    <div>
      <h1>Vous êtes connecté</h1>
      <div className="full-page-image">
        <img src={efreiHomePage} alt="Efrei Homepage" />
      </div>
    </div>
  );
};

export default HomePage;
