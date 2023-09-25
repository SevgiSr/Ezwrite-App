import { Link } from "react-router-dom";
import StyledSideNavbar from "./styles/SideNavbar.styled";
import { FaUser, FaUserClock } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function SideNavbar() {
  const { userState } = useContext(UserContext);
  return (
    <StyledSideNavbar>
      <div className="navbar-underlay"></div>
      <nav>
        <ul>
          <li>
            <Link to={`/user/${userState.user.name}`} className="link">
              <div className="icon">
                <FaUser />
              </div>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/browse" className="link">
              <div className="icon">
                <BsGlobe />
              </div>
              Browse
            </Link>
          </li>
          <li>
            <Link to="" className="link">
              <div className="icon">
                <FaUserClock />
              </div>
              Feed
            </Link>
          </li>
          <li>
            <Link to="/library" className="link">
              <div className="icon">
                <VscLibrary />
              </div>
              Library
            </Link>
          </li>
        </ul>
      </nav>
    </StyledSideNavbar>
  );
}

export default SideNavbar;
