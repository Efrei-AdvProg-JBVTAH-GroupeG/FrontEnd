import React, { useState, useEffect } from "react";
import "../style/login.css";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage.js";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn(userData);

      if (response) {
        setIsLoggedIn(true);
        login(response);

        console.log("Login Successful:", response);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Signup Failed:", error.message);
    }
  };

  const signIn = async (userData) => {
    try {
      const response = await fetch(
        "http://connect.thibaulthenrion.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  if (isLoggedIn) {
    return <HomePage />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="loginContainer">
        <div className="MainContainer">
          <h1 className="title">Connexion</h1>
          <div className="inputContainer">
            <label>
              <input
                className="inputLogin"
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
              />
            </label>
          </div>
          <br />
          <div className="inputContainer">
            <label>
              <input
                className="inputLogin"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
              />
            </label>
          </div>
          <br />

          <div className={"inputContainer"}>
            <button className={"inputButton"} type="submit">
              {" "}
              SE CONNECTER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
