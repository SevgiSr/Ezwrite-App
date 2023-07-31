import styled from "styled-components";

const StyledRespondParent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  form {
    width: 100%;
    padding: 20px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: var(--background3);
    position: relative;

    .icon {
      position: absolute;
      right: 30px;
    }

    textarea {
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: var(--font1);
      background-color: var(--background4);
      width: 84%;
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
