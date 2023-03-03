import styled from "styled-components";

const StyledChapter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .chapter-header {
    box-shadow: 0 2px 2px rgb(120 120 120 / 50%);
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin-bottom: 4rem;
    display: flex;
    justify-content: space-between;

    .story-dropdown-btn {
      width: 300px;
      height: 100%;
      color: #6f6f6f;
      padding: 5px 10px;
      border: none;
      border-right: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      :hover {
        background-color: #eee;
      }

      .story-card {
        display: flex;
        align-items: center;

        .info {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          text-align: start;

          .title {
            font-weight: 700;
            font-size: 15px;
            color: #222;
          }
        }
      }

      .down-icon {
        font-size: 30px;
        height: 100%;
        display: flex;
        align-items: center;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      button {
        margin-right: 2.5rem;
      }

      .add-list-btn {
        font-size: 20px;
        padding: 5px 15px;
      }

      .vote {
        color: #e64809;
        font-size: 15px;
        font-weight: 700;
        border: none;
        display: flex;
        align-items: center;
        cursor: pointer;

        .icon {
          display: flex;
          align-items: center;
          margin-right: 5px;
        }
      }

      .active-true {
        color: #e64809;
      }

      .active-false {
        color: #6f6f6f;
      }
    }
  }

  .dropdown-menu {
    overflow: scroll;
    max-height: 500px;
  }

  .chapter {
    width: 600px;
    .metadata {
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #eee;
      margin: 1rem 0;
      padding-bottom: 2rem;
      > * {
        display: flex;
        margin: 0 1rem;
        .icon {
          margin-right: 5px;
        }
      }
    }
    h1 {
      text-align: center;

      font-weight: 700;
      font-size: 32px;
      line-height: 40px;
      color: #121212;
    }
    .content {
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
    }
  }
  .comments {
    margin: 2rem 0;
  }
`;

export default StyledChapter;
