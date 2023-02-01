//read from database
import { NavLink } from "react-router-dom";
import StyledOrangeLinks from "./styles/OrangeLinks.styled";

const OrangeLinks = ({ links }) => {
  return (
    <StyledOrangeLinks>
      <div className="links">
        {links.map((link) => {
          return (
            <NavLink key={link} to={link.to} className="link">
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </StyledOrangeLinks>
  );
};

export default OrangeLinks;
