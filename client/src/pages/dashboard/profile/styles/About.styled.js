import styled from "styled-components";

const StyledAbout = styled.div`
  .container {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 30px;

    .about {
      padding: 2rem 1rem;
      height: fit-content;
      box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%),
        0 4px 5px 0 rgb(34 34 34 / 10%);
    }
    .stories {
      padding: 2rem 1rem;
      box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%),
        0 4px 5px 0 rgb(34 34 34 / 10%);
    }
  }
`;

export default StyledAbout;
