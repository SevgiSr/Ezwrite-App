import styled from "styled-components";

const StyledMyStory = styled.div`
  display: flex;
  padding: 20px 30px;
  position: relative;

  .story-title {
    text-decoration: none;
    font-size: 17px;
    width: fit-content;
    border-bottom: 2px solid transparent;
    color: var(--font1);
  }
  .story-title:hover {
    border-bottom: 2px solid var(--text-main-orange);
    cursor: pointer;
  }

  .chapters-dropdown {
    width: 100%;
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
        width: 100%;
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
    .edit-chapters-btn {
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      .down-icon {
        font-size: 17px;
        margin-left: 10px;
      }
    }
    .btn-delete {
      font-size: 20px;
      padding: 3px 5px;
      border: 1px solid #6f6f6f;
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

  .modal-content {
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
`;

export default StyledMyStory;
