import styled from "styled-components";

const StyledFollowing = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 10px;
  position: relative;

  .no-content-container {
    .icon {
      font-size: 30px;
    }
    .text {
      font-size: 15px;
    }
  }
`;

export default StyledFollowing;
