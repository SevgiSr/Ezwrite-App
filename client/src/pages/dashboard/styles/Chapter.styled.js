import styled from "styled-components";

const StyledChapter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  color: var(--font1);
  max-width: 600px;
  margin: 0 auto;

  .chapter-header {
    position: fixed;
    top: 51px;
    left: 230px;
    right: 0;
    z-index: 2;
    width: calc(100% - 230px);
    margin-bottom: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--background3);

    .is-fork {
      color: var(--font2);
      font-size: 15px;
      font-weight: 600;
      margin-right: auto;
      margin-left: 15px;
    }

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
    .dropdown-items-wrapper {
      max-height: 300px;
    }
    .dropdown-item {
      border-top: 1px solid #eee;
    }

    .active {
      border-left: 3px solid var(--accent);
      div {
        color: var(--text-main);
      }
    }

    .story-dropdown-btn {
      width: 300px;
      background-color: var(--background3);
      color: var(--font1);
      padding: 5px 10px;
      border: none;
      border-right: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

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
      }

      .add-list-btn {
        font-size: 20px;
        padding: 5px 15px;
      }

      .add-list-menu {
        width: fit-content;
        padding: 10px;
        left: -150px;
        top: 5px;
        .title {
          color: var(--font2);
        }

        .dropdown-item {
          display: flex;
          .reading-list {
            border: none;
            width: 100%;
            text-align: start;
            background-color: inherit;
            cursor: pointer;
            color: var(--font1);
          }
        }

        .new-reading-list {
          display: flex;
          button {
            margin: 0;
          }
        }
      }

      .vote {
        color: var(--text-main);
        background-color: transparent;
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
        color: var(--text-main);
      }

      .active-false {
        color: #6f6f6f;
      }
    }
  }

  .chapter {
    width: 100%;
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
    .flex-row {
      justify-content: center;
      line-height: 40px;
      h1 {
        text-align: center;
        font-weight: 700;
        font-size: 32px;
      }
      .visibility {
        margin-left: 10px;
        color: #6f6f6f;
      }
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
        bottom: -3px;
        right: 0;
        border: none;
        font-size: 23px;
        cursor: pointer;
        .icon {
          color: var(--icons);
          display: flex;
          align-items: center;
          justify-content: center;
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
      display: none;
      max-width: 500px;
      width: 100%;
      background-color: var(--background2);
      overflow-y: scroll;
      flex-direction: column;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      border-radius: 5px;
      padding: 50px 10px;
      scroll-behavior: smooth;
      .close-btn {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
    .open-modal {
      display: flex;
    }
  }

  .comments-section {
    width: 100%;
    .respond-component {
      form {
        background-color: transparent;
      }
    }
  }

  @media only screen and (max-width: 520px) {
    .chapter-header {
      .story-dropdown-btn {
        .story-card {
          margin-right: 10px;
        }
      }

      .actions {
        button {
          margin-right: 1.5rem;
        }
      }
    }
  }

  @media only screen and (max-width: 630px) {
    .chapter {
      .comments-modal {
        max-width: 100%;
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 720px) {
    .chapter-header {
      .story-dropdown-btn {
        width: fit-content;
        .story-card {
          margin-right: 30px;
        }
      }
      .actions {
        .vote {
          .text {
            display: none;
          }
          .icon {
            font-size: 18px;
            margin-right: 0;
          }
        }
      }
    }

    .chapter {
      .flex-row {
        h1 {
          font-size: 23px;
        }
      }
      .paragraph {
        .content {
          font-size: 16px;
        }
      }
    }
  }
  @media only screen and (max-width: 900px) {
    .chapter-header {
      left: 0;
      width: 100%;
    }
  }
`;

export default StyledChapter;
