//read from database
import { Link, NavLink } from "react-router-dom";
import { FcSettings } from "react-icons/fc";
import styled from "styled-components";

const NavLinks = ({ links, fontSize }) => {
  return (
    <StyledNavLinks fontSize={fontSize}>
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

const StyledNavLinks = styled.nav`
  .links {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;

    .link {
      text-decoration: none;
      color: var(--font2);
      font-weight: 500;
      margin-right: 2rem;
      font-size: ${({ fontSize }) => (fontSize ? fontSize : "inherit")};
      border-bottom: 4px solid transparent;
      padding: 10px 0;
    }

    @media only screen and (max-width: 1000px) {
    }

    .link:hover {
      font-weight: 700;
    }

    .link:focus {
      font-weight: 700;
      border-bottom: 4px solid var(--accent);
    }

    .active {
      font-weight: 700;
      border-bottom: 4px solid var(--accent);
    }
  }
`;

export default NavLinks;
