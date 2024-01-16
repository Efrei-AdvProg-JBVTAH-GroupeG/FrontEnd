import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

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

      console.log("Signup Successful:", response);
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
