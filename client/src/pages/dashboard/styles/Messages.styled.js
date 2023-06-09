import styled from "styled-components";

const StyledMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .parent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .messages {
      border-radius: 15px;
      height: 550px;
      width: 100%;
      box-sizing: border-box;
      padding: 1rem;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: #6f6f6f;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
  }
`;

export default StyledMessages;
