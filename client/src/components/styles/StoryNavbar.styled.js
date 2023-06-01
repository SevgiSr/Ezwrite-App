import styled from "styled-components";

const StyledStoryNavbar = styled.div`
  .navbarContainer {
    position: fixed;
    width: 100vw;
    padding: 5px 20px;
    box-sizing: border-box;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--background2);
    background-color: var(--background3);

    .write-dropdown-btn {
      border: none;
      cursor: pointer;
    }

    .write-dropdown-menu {
      background-color: #fff;

      .new-part-btn {
        width: fit-content;
      }
    }
    .story-card {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--background3);
      color: var(--font2);

      .back-btn {
        pointer-events: fill;
        .icon {
          color: var(--font1);
          font-size: 30px;
          margin-right: 10px;
        }
      }

      .story-info {
        margin-left: 5px;
        text-align: start;
        .story-title {
          cursor: pointer;
          font-size: 14px;
          margin: 0;
          display: flex;
        }

        .chapter-title {
          font-size: 20px;
          margin: 0;
        }

        .update-info {
          font-size: 14px;
          margin: 0;
        }
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
  }
`;

export default StyledStoryNavbar;
