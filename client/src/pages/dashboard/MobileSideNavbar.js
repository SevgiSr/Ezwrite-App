import { Link } from "react-router-dom";
import StyledSideNavbar from "./styles/SideNavbar.styled";
import styled from "styled-components";

function MobileSideNavbar() {
  return (
    <StyledMobileSideNavbar>
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
    </StyledMobileSideNavbar>
  );
}

const StyledMobileSideNavbar = styled.nav`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 230px;
  background-color: var(--background3);
  display: flex;
  justify-content: start;
  align-items: center;
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 100%;
    li {
      font-size: 26px;

      cursor: pointer;
      :hover {
        background-color: var(--background2);
      }
      .link {
        color: var(--font2);
        display: block;
        text-decoration: none;
        padding: 15px 23px;
      }
    }
  }
`;

export default MobileSideNavbar;
