//read from database
import { Link, NavLink } from "react-router-dom";
import StyledOrangeLinks from "./styles/OrangeLinks.styled";
import { FcSettings } from "react-icons/fc";

const OrangeLinks = ({ links }) => {
  return (
    <StyledOrangeLinks>
      <div className="links">
        {links.map((link) => {
          return (
            <NavLink
              key={links.indexOf(link)}
              to={link.to}
              className="link"
              onClick={link.handleClick}
            >
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </StyledOrangeLinks>
  );
};

export default OrangeLinks;
