import styled from "styled-components";

const StyledMyStories = styled.div`
  padding: 5rem 0;
  position: relative;
  > * {
    display: inline-block;
  }
  text-align: center;
  h2 {
    color: #222;
    font-size: 32px;
    font-weight: 600;
    line-height: 36px;
    text-align: start;
    margin-bottom: 1.5rem;
  }
  .container {
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
      color: #6f6f6f;
      box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%),
        0 4px 5px 0 rgb(34 34 34 / 10%);
    }
  }

  .container {
    .no-stories {
      padding: 30px 50px;
      .text {
        font-size: 24px;
        font-weight: 400;
        line-height: 30px;
      }
      .icon {
        font-size: 250px;
      }

      button {
        margin-top: 2.5rem;
      }
    }
  }
`;

export default StyledMyStories;
