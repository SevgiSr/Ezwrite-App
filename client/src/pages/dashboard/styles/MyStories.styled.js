import styled from "styled-components";

const StyledMyStories = styled.div`
  padding: 5rem 0;
  position: relative;
  text-align: center;
  color: var(--font1);

  .container {
    display: inline-block;
  }
  h2 {
    font-size: 32px;
    font-weight: 600;
    line-height: 36px;
    text-align: start;
    margin-bottom: 1.5rem;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    button {
      padding: 10px 20px;
    }
  }

  .stories-container {
    min-height: 200px;
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
  @media only screen and (min-width: 500px) {
    .container {
      width: 100%;
    }
  }
  @media only screen and (min-width: 768px) {
    .container {
      width: 680px;
    }
  }
  @media only screen and (min-width: 1350px) {
    .container {
      width: 790px;
    }
  }
`;

export default StyledMyStories;
