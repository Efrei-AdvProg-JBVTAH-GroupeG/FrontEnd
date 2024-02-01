import React from "react";
import { useAuth } from "../auth/AuthContext";
import "../style/UserProfile.css";
import Profile from "../asset/logo_profile.webp";

const UserProfile = () => {
  const { userData } = useAuth();

  if (!userData) {
    return <div>Loading...</div>;
  }

  const roleMapping = {
    ROLE_USER: "Élève",
    ROLE_ADMIN: "Administrateur",
  };

  const displayRoles = userData.roles
    .map((role) => roleMapping[role] || role)
    .join(", ");

  return (
    <div>
      <h1>Mon Profil</h1>

      <div className="user-profile">
        <div className="profile-container">
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Nom:</span>
              <span className="info-value">{userData.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Role:</span>
              <span className="info-value">{displayRoles}</span>
            </div>
          </div>

          <div className="profile-picture">
            <img src={Profile} alt="User Avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
