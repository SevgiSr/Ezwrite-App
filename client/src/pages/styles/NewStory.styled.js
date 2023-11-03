import styled from "styled-components";

const StyledNewStory = styled.div`
  .new-story-container {
    padding-top: 7rem;
    padding-bottom: 5rem;
    color: var(--font1);
    display: flex;
    align-items: start;
    justify-content: center;
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
  }

  @media only screen and (max-width: 1000px) {
    .new-story-container {
      flex-direction: column;
      align-items: center;
      .cover {
        margin-right: 0;
        display: flex;
        align-items: start;
        justify-content: center;
        .label {
          width: 250px;
          height: calc(250px * (125 / 80));
          margin-bottom: 1rem;
        }
      }

      .details {
        width: 85%;
      }
    }
  }
`;

export default StyledNewStory;
