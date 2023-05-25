import styled from "styled-components";

const StyledStoryNavbar = styled.div`
  .navbarContainer {
    position: fixed;
    width: 100vw;
    padding: 10px 20px;
    box-sizing: border-box;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;

    .write-dropdown-btn {
      border: none;
      cursor: pointer;

      .dropdown-menu {
        background-color: #fff;
      }
      .story-card {
        display: flex;
        align-items: center;
        justify-content: center;

        .back-btn {
          pointer-events: fill;
          .icon {
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
            font-size: 21px;
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
  }
`;

export default StyledStoryNavbar;
