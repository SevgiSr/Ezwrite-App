import styled from "styled-components";

const StyledWriting = styled.div`
  body {
  }

  .pageContainer {
    width: 100vw;
    height: 100vh;
  }

  .storyContainer {
    padding-top: 100px;
    width: 100%;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  #editTitle {
    border: none;
    width: 60%;
    height: fit-content;
    text-align: center;
    font-size: 2rem;
  }

  .active-paragraph {
    position: relative;
    .icon {
      position: absolute;
      left: -40px;
      top: 0;
      bottom: 0;
      cursor: pointer;
    }
  }

  .ai-form-container {
    width: 100%;
    border-radius: 9px;
    padding: 5px 10px;

    .options {
      display: flex;
      justify-content: space-between;
      > * {
        display: flex;
        flex-direction: column;
      }
    }

    label {
      color: white;
      margin: 0;
    }
    select {
      border-radius: 9px;
      font-size: inherit;
    }
    .edit-input {
      padding: 5px 10px;
      font-size: inherit;
      border-radius: 9px;
      border: 3px solid #4b8f29;
    }
    button {
      border-radius: 100%;
      font-size: 30px;
      padding: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  #editStory {
    width: 60%;
    min-height: 100px;
    margin-top: 30px;
    border: none;
    font-size: 18px;
    font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    line-height: 3rem;
  }

  textarea {
    /*     overflow: auto; */
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;
    /*remove the resize handle on the bottom right*/
  }
`;

export default StyledWriting;
