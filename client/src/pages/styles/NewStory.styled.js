import styled from "styled-components";

const StyledNewStory = styled.div`
  color: var(--font1);
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 3rem 0;
  button {
    > * {
      pointer-events: none;
    }
  }

  .cover {
    margin-right: 4rem;
    width: 300px;
    height: 468px;
    .label {
      background-color: var(--background5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      height: 100%;

      svg {
        width: 50%;
        height: 86px;
        margin: 0 auto;
      }
    }

    input {
      display: none;
    }

    .cover-img {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }
  .details {
    width: 50%;
  }

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    .upload-picture {
      .label {
        width: 195px;
        height: 304px;
        margin-bottom: 1rem;
      }
    }

    .details {
      width: 85%;
    }
  }
`;

export default StyledNewStory;
