import styled from "styled-components";

const StyledNewStory = styled.div`
  color: var(--font1);
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 3rem 0;
  button {
    > * {
      pointer-events: none;
    }
  }

  .cover {
    margin-right: 4rem;
    width: 300px;
    height: 468px;
    .label {
      background-color: var(--background5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      height: 100%;

      svg {
        width: 50%;
        height: 86px;
        margin: 0 auto;
      }
    }

    input {
      display: none;
    }

    .cover-img {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }
  .details {
    width: 50%;
    display: flex;
    flex-direction: column;
    background-color: var(--background5);
    .item {
      margin-bottom: 3rem;
      display: flex;
      flex-direction: column;
    }
    button {
      width: fit-content;
    }
    h1 {
      color: var(--font1);
      border-bottom: 5px solid #ff6122;
      width: fit-content;
      margin-bottom: 2rem;
    }
    label {
      font-size: 21px;
      font-weight: 600;
      color: var(--font2);
      margin-bottom: 15px;
      display: inline-block;
    }
    #title,
    #desc {
      border: 1px solid #eee;
      padding: 10px 20px;
      background-color: var(--background4);
      color: var(--font1);
    }

    #title:focus,
    #desc:focus {
      border: 1px solid #222;
    }
    #category {
      padding: 0;
      border: none;
    }
    #category select {
      font-size: 15px;
      padding: 10px;
      background-color: var(--background4);
      color: var(--font1);
    }

    /* TAGS */
    .tags-items {
      display: flex;
      margin-bottom: 1rem;
    }
    .tag-item {
      display: flex;
      background-color: var(--background4);
      color: var(--font1);
      width: fit-content;
      padding: 10px;
      border-radius: 100px;
      border: 1px solid transparent;
      font-size: 13px;
      font-weight: 700;
      margin-right: 10px;
      .icon {
        margin-left: 5px;
        font-size: 10px;
        color: var(--font1);
      }
      .delete-tag {
        cursor: pointer;
      }
    }

    .tag-btn {
      display: flex;
      align-items: center;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 100px;
      font-size: 13px;
      color: var(--font2);
      cursor: pointer;
      .icon {
        margin-left: 5px;
        font-size: 15px;
        color: var(--font1);
      }
    }
    .tag-input {
      border: none;
      font-size: 17px;
      background-color: var(--background5);
      color: var(--font1);
    }

    /* language */
    .language {
      select {
        padding: 10px;
        background-color: var(--background4);
        color: var(--font1);
      }
    }
    /* submit */
    .create-btn {
      margin: 0;
      padding: 10px;
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

    .details {
      width: 85%;
    }
  }
`;

export default StyledNewStory;
