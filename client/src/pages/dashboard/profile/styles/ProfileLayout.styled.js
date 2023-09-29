import styled from "styled-components";

const StyledProfileLayout = styled.div`
  max-width: 960px;
  margin: 0 auto;
  background-color: var(--background3);
  padding-bottom: 3rem;
  min-height: 100vh;

  .outlet {
    padding: 10px 23px;
  }

  /*   @media only screen and (max-width: 768px) {
    .media-container {
      width: 100%;
      padding: 0 20px;
    }
  }

  @media only screen and (min-width: 768px) {
    .media-container {
      width: 740px;
    }
  }
  @media only screen and (min-width: 992px) {
    .media-container {
      width: 960px;
    }
  }
  @media only screen and (min-width: 1350px) {
    .media-container {
      width: 1160px;
    }
  } */
`;

export default StyledProfileLayout;
