import styled from "styled-components";

const StyledActivity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 5rem;
  .column-reverse {
    max-width: 650px;
    width: 100%;
  }

  .no-content-container {
    .icon {
      font-size: 30px;
    }
    .text {
      font-size: 15px;
    }
  }
`;

export default StyledActivity;
