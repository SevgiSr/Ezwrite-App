import styled from "styled-components";

const StyledMessages = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    position: absolute;
    top: 60px;
    left: 60px;
  }

  .parent {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .messages {
      border: 1px solid #eee;
      box-shadow: 0 2px 5px rgb(120 120 120 / 25%);
      border-radius: 15px;
      height: 65%;
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
