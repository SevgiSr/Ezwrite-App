import styled from "styled-components";

const StyledMyFork = styled.div`
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
      > .icon {
        margin-left: 5px;
      }
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
`;

export default StyledMyFork;
