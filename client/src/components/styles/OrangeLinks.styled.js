import styled from "styled-components";

const StyledOrangeLinks = styled.nav`
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #eee;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  .links {
    list-style: none;
    padding: 0;

    .link {
      text-decoration: none;
      font-size: 1.2rem;
      color: #222;
      margin: 0 1em;
    }

    .link:hover {
      font-weight: 700;
    }

    .link:focus {
      font-weight: 700;
      border-bottom: 5px solid orange;
    }
  }
`;

export default StyledOrangeLinks;
