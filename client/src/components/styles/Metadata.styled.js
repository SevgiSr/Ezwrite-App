import styled from "styled-components";

const StyledMetadata = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  > * {
    display: flex;
    .icon {
      font-size: 16px;
      padding-right: 3px;
    }
  }
`;

export default StyledMetadata;
