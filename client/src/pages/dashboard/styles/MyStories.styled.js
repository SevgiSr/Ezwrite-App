import styled from "styled-components";

const StyledMyStories = styled.div`
  .no-content-container {
    padding: 30px 50px;
    background-color: var(--background5);
    text-align: center;

    .text {
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
    }
    .icon {
      font-size: 150px;
      margin: 0 auto;
    }

    button {
      margin-top: 2.5rem;
    }
  }

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
    background-color: var(--background5);
    padding: 1rem;
    box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%), 0 4px 5px 0 rgb(34 34 34 / 10%);
  }

  .collab-request {
    color: var(--font1);
    background-color: var(--background5);
    box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
    margin-top: 1.5rem;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    font-size: 14px;

    .story {
      margin-left: 10px;
      text-decoration: none;
      color: var(--font1);
    }

    .user {
      margin: 0 10px;
      display: inline-block;
    }

    header {
      margin-bottom: 5px;
    }

    .collab-icon {
      margin-right: 5px;
      font-size: 30px;
    }

    .content {
      font-size: 14px;
    }
  }
`;

export default StyledMyStories;
