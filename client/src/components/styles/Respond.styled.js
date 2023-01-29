import styled from "styled-components";

const StyledRespond = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #eee;
  box-shadow: 0 2px 5px rgb(120 120 120 / 25%);

  form {
    width: 85%;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    textarea {
      font-size: 16px;
      font-weight: 300;
      line-height: 24px;
      color: #6f6f6f;
      width: 100%;
      height: 30px;
      border: none;
      padding: 0.5rem;
      -webkit-transition: height 0.5s;
    }

    button {
      display: none;
      border: none;
      padding: 10px 10px;
      margin-top: 1rem;
    }
    button:hover,
    button:focus {
      display: block;
    }

    textarea:focus {
      height: 80px;
    }
    textarea:focus ~ button {
      display: block;
    }
  }
`;

export default StyledRespond;
