import styled from "styled-components";

const StyledReadingList = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  padding: 3rem 20px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main-header {
      margin-bottom: 1.7rem;
      h1 {
        font-size: 32px;
      }
      h2 {
        margin-bottom: 1rem;
        font-weight: 300;
        color: var(--font2);
      }
    }
    button {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 5px;
      }
    }
  }

  .main {
    display: flex;
    .item {
      position: relative;
      margin-right: 15px;
      .remove-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 35px;
        color: var(--font2);
        cursor: pointer;
      }
    }
  }

  form {
    font-size: 30px;
    display: flex;

    .title {
      position: relative;

      .title-input {
        display: block;
        position: absolute;
        font-size: 28px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    .icon {
      margin-left: 10px;
      cursor: pointer;
    }
  }
`;

export default StyledReadingList;
