import styled from "styled-components";

const StyledMyStories = styled.div`
  padding-top: 5rem;
  > * {
    display: inline-block;
  }
  text-align: center;
  .container {
    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 30px;
    }

    .stories-container {
      color: #6f6f6f;
      box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%),
        0 4px 5px 0 rgb(34 34 34 / 10%);
    }
  }
`;

export default StyledMyStories;
