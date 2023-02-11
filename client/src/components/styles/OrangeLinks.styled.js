import styled from "styled-components";

const StyledOrangeLinks = styled.nav`
  display: flex;
  align-items: center;
  .links {
    list-style: none;
    padding: 0;

    .link {
      line-height: 66px;
      font-size: 20px;
      color: #222;
      border-bottom-width: 4px;
      margin: 0 2rem;
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
      border-bottom: 5px solid #ff6122;
    }
  }
`;

export default StyledOrangeLinks;
