import { Link } from "react-router-dom";
import StyledSideNavbar from "./styles/SideNavbar.styled";
import styled from "styled-components";
import { FaUser, FaUserClock } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { BsFillEnvelopeFill, BsGlobe } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { useState } from "react";
import { useEffect } from "react";
import { BiNetworkChart } from "react-icons/bi";

function MobileSideNavbar() {
  const { userState } = useContext(UserContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth > 900) return null;
  return (
    <StyledMobileSideNavbar>
      <ul>
        <li>
          <Link to={`/user/${userState.user.name}`} className="link">
            <div className="icon">
              <FaUser />
            </div>
            Profile
          </Link>
        </li>
        {windowWidth <= 768 && (
          <li className="nav-item">
            <Link to="/inbox" className="link">
              <div className="icon">
                <BsFillEnvelopeFill />
              </div>
              Inbox
            </Link>
          </li>
        )}
        {windowWidth <= 768 && (
          <li>
            <Link to="/collaborations" className="link">
              <div className="icon">
                <BiNetworkChart />
              </div>
              Collaborations
            </Link>
          </li>
        )}
        <li>
          <Link to="/browse" className="link">
            <div className="icon">
              <BsGlobe />
            </div>
            Browse
          </Link>
        </li>
        <li>
          <Link to="/feed" className="link">
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
      font-size: 24px;

      cursor: pointer;
      :hover {
        background-color: var(--background2);
      }
      .link {
        color: var(--font2);
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 23px 20px;

        .icon {
          margin-right: 10px;
        }
      }
    }
  }

  @media only screen and (max-width: 720px) {
    ul {
      li {
        font-size: 20px;
      }
    }
  }
`;

export default MobileSideNavbar;
