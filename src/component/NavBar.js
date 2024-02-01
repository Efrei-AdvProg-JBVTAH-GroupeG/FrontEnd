import { NavLink } from "react-router-dom";
import "../style/NavBar.css";
import Logo from "../asset/Logo_Efrei.png";

const NavBar = () => {
  return (
    <div className="container">
      <div className="Main_Container">
        <div className="Main_elements">
          <div className="Logo">
            <img src={Logo} alt="Your Logo" className="LogoImage" />
          </div>

          <div className="Links">
            <NavLink
              id="link"
              style={{ textDecoration: "none", color: "white", fontSize: 25 }}
              to="/"
            >
              <i className="fa-solid fa-house"></i>
            </NavLink>
          </div>

          <div className="Links">
            <NavLink
              id="home"
              style={{ textDecoration: "none", color: "white", fontSize: 25 }}
              to="/upload"
            >
              <i className="fa-solid fa-upload"></i>
            </NavLink>
          </div>

          <div className="Links" style={{ marginLeft: "auto" }}>
            <NavLink
              id="profile"
              style={{ textDecoration: "none", color: "white", fontSize: 25 }}
              to="/profile"
            >
              <i className="fas fa-user" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
