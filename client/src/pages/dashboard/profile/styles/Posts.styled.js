import styled from "styled-components";

const StyledPosts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #parent {
    max-width: 550px;
    width: 100%;
    margin-bottom: 150px;
  }

  .column-reverse {
    width: 100%;

    .conv {
      width: 100%;
    }
  }
`;

export default StyledPosts;
