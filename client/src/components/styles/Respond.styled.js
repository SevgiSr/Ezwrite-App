import styled from "styled-components";

const StyledRespondParent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #eee;
  box-shadow: 0 2px 5px rgb(120 120 120 / 25%);

  form {
    width: 500px;
    padding: 20px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    textarea {
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: #6f6f6f;
      width: 84%;
      height: 30px;
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
      border-radius: 10px;
    }
    .share-show {
      display: block;
    }

    .comment-show {
      height: 80px;
      margin-bottom: 40px;
    }
    .comment-show ~ button {
      display: block;
    }
  }
`;

const StyledRespond = styled(StyledRespondParent)`
  box-shadow: none;
  form {
    textarea {
      border: 3px solid #6f6f6f;
      border-radius: 30px;
    }
  }
`;

export default StyledRespond;
