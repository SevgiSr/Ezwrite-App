import styled from "styled-components";

const StyledNewStory = styled.div`
  color: #6f6f6f;
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 3rem 0;

  .upload-picture {
    margin-right: 4rem;
    .label {
      width: 300px;
      height: 468px;
      background-color: #eee;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        width: 50%;
        height: 86px;
        margin: 0 auto;
      }
    }

    input {
      display: none;
    }
  }
  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    h1 {
      color: #000;
      border-bottom: 5px solid #ff6122;
      width: fit-content;
      margin-bottom: 2rem;
    }
    label {
      font-size: 21px;
      font-weight: 600;
      color: #222;
      margin-bottom: 9px;
      display: inline-block;
    }
    #title,
    #desc {
      margin-bottom: 1rem;
      border: 1px solid #eee;
      padding: 10px 20px;
    }

    #title:focus,
    #desc:focus {
      border: 1px solid #222;
    }
    #category {
      padding: 0;
      margin-bottom: 1rem;
      border: none;
    }
    #category select {
      font-size: 15px;
      padding: 10px;
    }
    .create-btn {
      margin-top: 1rem;
      padding: 10px;
      width: 100px;
    }
  }

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    .upload-picture {
      .label {
        width: 195px;
        height: 304px;
        margin-bottom: 1rem;
      }
    }

    form {
      width: 85%;
    }
  }
`;

export default StyledNewStory;
