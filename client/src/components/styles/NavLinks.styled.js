import styled from "styled-components";

const StyledNavLinks = styled.nav`
  .links {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;

    .link {
      text-decoration: none;
      color: var(--font2);
      line-height: 58px;
      font-size: 17px;
      font-weight: 500;
      margin-right: 2rem;
      border-bottom: 4px solid transparent;
    }

    @media only screen and (max-width: 1000px) {
      .link {
        font-size: 17px;
      }
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

export default StyledNavLinks;
