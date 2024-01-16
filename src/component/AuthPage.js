import React, { useState } from "react";
import Login from "./login";
import SignUp from "./SignUp";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login /> : <SignUp />}
      <button onClick={toggleForm}>
        {isLogin
          ? "Tu n'as pas de compte ? Inscris-toi"
          : "Tu as déjà un compte ? Connecte-toi"}
      </button>
    </div>
  );
};

export default AuthPage;
