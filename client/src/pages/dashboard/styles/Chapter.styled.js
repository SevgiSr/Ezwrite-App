import styled from "styled-components";

const StyledChapter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  color: var(--font1);

  .chapter-header {
    position: fixed;
    top: 54px;
    left: 0;
    right: 0;
    z-index: 2;
    width: 100%;
    margin-bottom: 4rem;
    display: flex;
    justify-content: space-between;
    background-color: var(--background3);

    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      background-color: var(--background3);
    }

    .dropdown-menu-parent {
      margin: 0 1rem;
      box-sizing: border-box;
    }
    .dropdown-menu {
      width: 100%;
      border-radius: 1px;
    }
    .dropdown-item {
      border-top: 1px solid #eee;
    }

    .active {
      border-left: 3px solid #ff6122;
      div {
        color: #ff6122;
      }
    }

    .story-dropdown-btn {
      width: 300px;
      height: 100%;
      background-color: var(--background3);
      color: var(--font1);
      padding: 5px 10px;
      border: none;
      border-right: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      :hover {
        background-color: var(--background5);
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
        background-color: var(--background3);
      }

      .add-list-btn {
        font-size: 20px;
        padding: 5px 15px;
        background-color: var(--button-main);
      }

      .add-list-menu {
        width: fit-content;
        padding: 10px;
        left: -150px;
        top: 5px;
        .title {
          color: var(--font2);
        }

        .reading-list {
          border: none;
          width: 100%;
          text-align: start;
          background-color: inherit;
          cursor: pointer;
          color: var(--font1);
        }

        .new-reading-list {
          display: flex;
          button {
            margin: 0;
            background-color: var(--button-main);
          }
        }
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

  .chapter {
    width: 600px;
    word-wrap: break-word;
    color: var(--font1);
    margin-bottom: 100px;
    .metadata {
      color: var(--font2);
      display: flex;
      justify-content: center;
      border-bottom: 1px solid var(--font2);
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
    }
    .paragraph {
      position: relative;
      padding-right: 50px;
      box-sizing: content-box;
      .content {
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
      }
      .comment-btn {
        display: none;
        position: absolute;
        bottom: 2px;
        right: 0;
        border: none;
        font-size: 23px;
        cursor: pointer;
        .icon {
          color: var(--icons);
        }
        .count {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          bottom: 5px;
          left: 0;
          right: 0;
          color: var(--font1);
          font-size: 12px;
          font-weight: 600;
        }
      }
      .comment-btn:hover {
        .icon {
          color: #bfbfbf;
        }
      }
      .btn-visible {
        display: block;
      }
    }
    .comments-modal {
      width: 500px;
      background-color: var(--background2);
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      border-radius: 5px;
      padding: 30px;
    }
    .open-modal {
      display: block;
    }
  }

  .comments-section {
    width: 600px;
    .respond-component {
      form {
        background-color: transparent;
      }
    }
  }
`;

export default StyledChapter;
