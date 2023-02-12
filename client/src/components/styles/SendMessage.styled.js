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
      box-shadow: 0 2px 5px rgb(120 120 120 / 25%);
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: #6f6f6f;
      width: 85%;
      height: 30px;
      border: none;
      padding: 0.5rem;
      -webkit-transition: height 0.5s;
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
