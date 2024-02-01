import React, { useState } from "react";
import "../style/SignUp.css";

const SignUp = () => {
  // const roleOptions = ["Admin", "Élève", "Professeur"];

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    //role: [],
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /*
  const handleRoleChange = (role) => {
    let updatedRoles = [...userData.role];
    if (userData.role.includes(role)) {
      updatedRoles = updatedRoles.filter((r) => r !== role);
    } else {
      updatedRoles.push(role);
    }
    setUserData({ ...userData, role: updatedRoles });
  };
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUpUser(userData);

      console.log("Signup Successful:", response);
    } catch (error) {
      console.error("Signup Failed:", error.message);
    }
  };

  const signUpUser = async (userData) => {
    console.log("Sending userData:", userData);
    try {
      const response = await fetch(
        "http://connect.thibaulthenrion.com/api/auth/signup",
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
          <h1 className="title">Inscription</h1>
          <div className="inputContainer">
            <label>
              <input
                className="inputSignUp"
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
                className="inputSignUp"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </label>
          </div>
          <br />

          <div className="inputContainer">
            <input
              className="inputSignUp"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
            />
          </div>
          <br />

          <br />

          <div className={"inputContainer"}>
            <button className={"inputButton"} type="submit">
              {" "}
              S'INSCRIRE
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;

/*
{roleOptions.map((role) => (
  <div className="roleSelect" key={role}>
    <input
      type="checkbox"
      name="role"
      value={role}
      checked={userData.role.includes(role)}
      onChange={() => handleRoleChange(role)}
    />
    {role}
  </div>
))}
*/
