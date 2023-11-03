import styled from "styled-components";

const StyledStoryDetails = styled.div`
  form {
    width: inherit;
    display: flex;
    flex-direction: column;
    color: var(--font1);
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
      color: #6f6f6f;
      font-weight: 600;
      margin-bottom: 1.7rem;
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
      border: 1px solid #6f6f6f;
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
      flex-wrap: wrap;
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
      margin-bottom: 10px;
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
      width: 100%;
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

  .tag-suggestions {
    background-color: #222;
    width: 100%;
    .tag-suggestion {
      padding: 5px 25px;
      cursor: pointer;
      :hover {
        background-color: var(--background3);
      }
    }
  }
`;

export default StyledStoryDetails;
