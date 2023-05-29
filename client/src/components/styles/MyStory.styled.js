import styled from "styled-components";

const StyledMyStory = styled.div`
  display: flex;
  padding: 20px 30px;
  border-bottom: 1px solid var(--font2);
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

  .dropdown-menu {
    display: block;
    padding: 0.75rem 0;
    width: 250px;
    border-radius: 0;
    overflow: scroll;
    max-height: 200px;
    z-index: 999;
    scrollbar-color: var(--background5);
    .dropdown-items {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .dropdown-item {
        font-size: 12px;
        text-align: start;
        border-bottom: 1px solid #eee;
        width: 80%;
        p {
          color: #6f6f6f;
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
      width: 120px;
      padding: 10px 15px;
      button {
        font-size: 14px;
        font-weight: 600;
        color: #6f6f6f;
        border: none;
        cursor: pointer;
      }
      .icon {
        margin-right: 5px;
      }
    }
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
  }

  .delete-story-modal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    z-index: 1000;
    background-color: white;
    border-radius: 5px;
    padding: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);

    .close-modal-btn {
      border: none;
      position: relative;
      right: 15px;
      bottom: 15px;
      font-size: 30px;
      color: #ff6122;
      cursor: pointer;
    }

    h2 {
      margin-bottom: 1rem;
    }

    .buttons {
      margin-top: 1.7rem;

      .cancel-btn {
        color: #222;
        background-color: #eee;
        border-color: #eee;
      }
      .cancel-btn:hover {
        color: #222;
        background-color: #e1e1e1;
        border-color: #e1e1e1;
      }
    }
  }
  .open-modal {
    display: block;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

export default StyledMyStory;
