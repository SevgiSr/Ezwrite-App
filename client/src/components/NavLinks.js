//read from database
import { Link, NavLink } from "react-router-dom";
import StyledNavLinks from "./styles/NavLinks.styled";
import { FcSettings } from "react-icons/fc";

const NavLinks = ({ links }) => {
  return (
    <StyledNavLinks>
      <div className="links">
        {links.map((link) => {
          return (
            <NavLink
              key={links.indexOf(link)}
              to={link.to}
              className={
                "link " +
                (link.active ? "active " : "") +
                (link.className ? link.className : "")
              }
              onClick={link.handleClick}
            >
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </StyledNavLinks>
  );
};

export default NavLinks;
