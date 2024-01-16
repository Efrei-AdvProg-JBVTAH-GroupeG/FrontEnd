import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="container">
      <div className="Main_Container">
        <div className="Main_elements">
          <div className="MyName"> EfreiUpload</div>

          <div className="Links">
            <NavLink
              id="link"
              style={{ textDecoration: "none", color: "white" }}
              to="/"
            >
              Se connecter
            </NavLink>
          </div>

          <div className="Links">
            <NavLink
              id="home"
              style={{ textDecoration: "none", color: "white" }}
              to="/upload"
            >
              Upload Page
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
