import styled from "styled-components";

const StyledProfileLayout = styled.div`
  width: 100%;
  .media-container {
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media only screen and (max-width: 768px) {
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
  }
`;

export default StyledProfileLayout;
