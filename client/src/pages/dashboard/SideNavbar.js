import { Link } from "react-router-dom";
import StyledSideNavbar from "./styles/SideNavbar.styled";

function SideNavbar() {
  return (
    <StyledSideNavbar>
      <div className="navbar-underlay"></div>
      <nav>
        <ul>
          <li>
            <Link to="/browse" className="link">
              Browse
            </Link>
          </li>
          <li>
            <Link to="/library" className="link">
              Library
            </Link>
          </li>
        </ul>
      </nav>
    </StyledSideNavbar>
  );
}

export default SideNavbar;
