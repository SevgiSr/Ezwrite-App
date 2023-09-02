import styled from "styled-components";

const StyledMyStories = styled.div`
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;

    .header-loader {
      margin-left: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-left: 5px;
      }
    }
  }

  .stories-container {
    min-height: fit-content;
    background-color: var(--background5);
    padding: 1rem;
    box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%), 0 4px 5px 0 rgb(34 34 34 / 10%);
  }

  .no-stories {
    padding: 30px 50px;
    background-color: var(--background5);

    .text {
      font-size: 24px;
      font-weight: 400;
      line-height: 30px;
    }
    .icon {
      font-size: 250px;
      margin: 0 auto;
    }

    button {
      margin-top: 2.5rem;
    }
  }
`;

export default StyledMyStories;
