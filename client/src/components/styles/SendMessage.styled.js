import styled from "styled-components";

const StyledSendMessage = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  form {
    width: 500px;
    padding: 20px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    textarea {
      border-radius: 15px;
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: var(--font1);
      background-color: var(--background5);
      width: 85%;
      height: 45px;
      border: none;
      padding: 0.5rem 0.8rem;
      -webkit-transition: height 0.5s;
      resize: none;
    }
    button {
      cursor: pointer;
      display: none;
      position: absolute;
      bottom: 10px;
      right: 10px;
      border: none;
      padding: 10px 10px;
    }
    .sendBtn-show {
      display: block;
    }

    .msgBox-show {
      height: 80px;
      margin-bottom: 40px;
    }
    .msgBox-show ~ button {
      display: block;
    }
  }
`;

export default StyledSendMessage;
