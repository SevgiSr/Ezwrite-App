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

  .my-fork {
    display: flex;
    padding: 20px 30px;
    position: relative;

    .story-title {
      width: fit-content;
      border-bottom: 2px solid transparent;
      color: var(--font1);
    }
    .story-title:hover {
      border-bottom: 2px solid var(--text-main-orange);
      cursor: pointer;
    }

    .chapters-dropdown {
      display: block;
      padding: 0.75rem 0;
      width: 250px;
      border-radius: 0;
      max-height: 250px;
      max-width: 300px;
      overflow: auto;
      background-color: var(--background2);
      scrollbar-color: var(--background5);
      .dropdown-items {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .dropdown-item {
          font-size: 12px;
          text-align: start;
          border-bottom: 1px solid var(--font2);
          p {
            color: var(--font2);
          }

          :last-child {
            border-bottom: none;
          }
        }
      }
    }

    /*   .edit-dropdown-menu::after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background-color: #222;
  } */
    .cover {
      margin-right: 0.7rem;
    }

    .info {
      text-align: start;
      margin-right: 2rem;
      color: var(--font2);
    }

    .buttons {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: end;
      .story-btn {
        position: relative;
        padding: 9px 50px;
        margin-bottom: 10px;
        .text {
          padding-right: 20px;
        }
        .down-icon {
          font-size: 20px;
          position: absolute;
          right: 10px;
          padding-left: 16px;
          border-left: 1px solid #fafafa;
        }
      }
      .white-button {
        color: #222;
        font-size: 30px;
        font-weight: 600;
        border-radius: 5px;
        padding: 6px 8px;
        width: fit-content;
        color: #6f6f6f;
        border: 3px solid #eee;
      }
      .more-menu {
        overflow: hidden;
        width: fit-content;

        display: block;

        padding: 3px 15px;
      }
    }

    .flex-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
    }
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
`;

export default StyledMyForks;
