import styled from "styled-components";

const StyledOrangeLinks = styled.nav`
  .links {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;

    .link {
      text-decoration: none;
      color: #222;
      line-height: 58px;
      font-size: 17px;
      font-weight: 500;
      margin-right: 2rem;
      border-bottom: 4px solid transparent;
    }

    @media only screen and (max-width: 1000px) {
      .link {
        margin: 0 1rem;
        font-size: 17px;
      }
    }

    .link:hover {
      font-weight: 700;
    }

    .link:focus {
      font-weight: 700;
      border-bottom: 4px solid #ff6122;
    }
  }
`;

export default StyledOrangeLinks;
