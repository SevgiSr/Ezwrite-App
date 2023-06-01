import styled from "styled-components";

const StyledWriting = styled.div`
  .pageContainer {
    width: 100%;
  }

  .storyContainer {
    padding-top: 110px;
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
    background-color: var(--background4);
    color: var(--font1);
  }

  .active-paragraph {
    position: relative;
    .AI-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: -40px;
      top: 0;
      bottom: 0;
      cursor: pointer;
      color: var(--font1);
    }
  }

  .ai-form-parent {
    position: relative;
    z-index: 999;
    width: 100%;
  }

  .ai-form-container {
    width: 100%;
    box-sizing: border-box;
    border-radius: 9px;
    padding: 1rem;
    background-color: var(--background1);
    display: flex;
    flex-direction: column;
    pointer-events: auto;

    .edit-input {
      width: 100%;
      box-sizing: border-box;
      padding: 5px 10px;
      font-size: inherit;
      border-radius: 9px;
      border: 3px solid #6f6f6f;
      :focus {
        border: 3px solid var(--light-orange);
      }
    }

    .button-row {
      position: relative;
      width: 100%;
      height: 30px;
      display: inline-block;
      button {
        position: absolute;
        right: -30px;
        top: -30px;
        border-radius: 100%;
        font-size: 30px;
        padding: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }

    .ai-loading {
      display: flex;
      align-items: center;
      justify-content: start;
    }

    .response {
    }

    .options {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      > * {
        display: flex;
        flex-direction: column;
      }
      .length {
        width: fit-content;
        input {
          padding: 3px 5px;
          font-size: 14px;
          font-weight: 600;
        }
      }
      .style {
        select {
          margin: 0;
          border-radius: 9px;
          font-size: inherit;
        }
      }
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
