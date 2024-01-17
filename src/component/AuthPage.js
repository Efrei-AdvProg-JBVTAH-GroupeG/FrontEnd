import React, { useState } from "react";
import Login from "./login";
import SignUp from "./SignUp";
import { useAuth } from "./AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (isAuthenticated) {
    return <div>{isLogin ? <Login /> : <SignUp />}</div>;
  }

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
