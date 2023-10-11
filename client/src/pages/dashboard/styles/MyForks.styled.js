import styled from "styled-components";

const StyledMyForks = styled.div`
  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }

  .stories-container {
    min-height: fit-content;
    background-color: var(--background5);
    padding: 1rem;
    box-shadow: 0 1px 10px 0 rgb(34 34 34 / 8%), 0 4px 5px 0 rgb(34 34 34 / 10%);
  }

  .pending-fork {
    color: var(--font1);
    background-color: var(--background5);
    box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
    margin-top: 1.5rem;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    font-size: 14px;

    .story {
      margin-left: 10px;
      text-decoration: none;
      color: var(--font1);
    }

    .user {
      margin: 0 10px;
      display: inline-block;
    }

    header {
      margin-bottom: 5px;
    }

    .collab-icon {
      margin-right: 5px;
      font-size: 30px;
    }

    .content {
      font-size: 14px;
    }
  }

  .pull-form {
    display: flex;
    flex-direction: column;

    .form-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.3rem;

      input,
      textarea {
        background-color: var(--background5);
        border: none;
        padding: 10px 15px;
        font-size: 17px;
        color: var(--font1);
      }

      label {
        color: var(--font2);
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 0.8rem;
      }
    }
  }
`;

export default StyledMyForks;
