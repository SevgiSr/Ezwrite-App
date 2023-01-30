import styled from "styled-components";

const StyledMyStory = styled.div`
  display: flex;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;

  .cover {
    margin-right: 0.7rem;
  }

  .info {
    text-align: start;
    margin-right: 2rem;
  }

  .buttons {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    > * {
      margin-bottom: 0.5rem;
    }
  }
`;

export default StyledMyStory;
