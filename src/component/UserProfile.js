import React from "react";
import { useAuth } from "./AuthContext";

const UserProfile = () => {
  const { userData } = useAuth();

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Mon Profile</h1>
      <p>
        <strong>Username:</strong> {userData.username}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <p>
        <strong>Roles:</strong> {userData.roles.join(", ")}
      </p>
    </div>
  );
};

export default UserProfile;
