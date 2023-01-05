import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import {
  faHome,
  faUser,
  faEnvelope,
  faSuitcase,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export const CustomLi = () => {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <img src="/images/homeImages/betterLogo.svg" alt="" />
      </Link>
      <nav>
        <NavLink to="/">
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </NavLink>
        <NavLink className="profile-link" to="/profile">
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </NavLink>
        <NavLink className="skills-link" to="/skills">
          <FontAwesomeIcon icon={faSuitcase} color="#4d4d4e" />
        </NavLink>
        <NavLink className="projects-link" to="/projects">
          <FontAwesomeIcon icon={faEye} color="#4d4d4e" />
        </NavLink>
        <NavLink className="contact-link" to="/contact">
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </NavLink>
      </nav>
    </div>
  );
};
