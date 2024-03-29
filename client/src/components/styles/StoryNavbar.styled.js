import styled from "styled-components";

const StyledStoryNavbar = styled.nav`
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

  .story-section {
    display: flex;
    align-items: center;

    .back-btn {
      pointer-events: fill;
      .icon {
        color: var(--font1);
        font-size: 30px;
        margin-right: 10px;
      }
    }

    .write-dropdown-btn {
      border: none;
      cursor: pointer;

      .story-card {
        display: flex;
        align-items: center;
        justify-content: start;
        background-color: var(--background3);
        color: var(--font2);

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

    .write-dropdown-menu {
      background-color: var(--background2);
      width: 150%;
      left: 0;

      .dropdown-item {
        border-bottom: 1px solid var(--font2);
      }

      .dropdown-items-wrapper {
        max-height: 300px;
      }

      .new-part-btn {
        width: fit-content;
        margin: 1rem auto 0 auto;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;

    .options {
      margin-left: 1.5rem;
      .dropdown-menu {
        left: -100px;
      }
      .dropdown-item {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--font1);
        .icon {
          font-size: 15px;
          margin-right: 5px;
        }
      }
      button {
        border: none;
        cursor: pointer;
        background-color: var(--background3);
        color: var(--font2);
        .icon {
          font-size: 38px;
        }
      }
    }
  }

  @media only screen and (max-width: 540px) {
    .buttons {
      flex-wrap: wrap;
    }
  }

  @media only screen and (max-width: 720px) {
    padding: 10px 10px;
    .story-section {
      .back-btn {
        .icon {
          font-size: 20px;
          margin-right: 5px;
        }
      }
      .write-dropdown-btn {
        .story-card {
          .story-info {
            .story-title {
              font-size: 12px;
            }
            .chapter-title {
              font-size: 16px;
            }

            .update-info {
              font-size: 12px;
            }
          }
        }
      }
    }
    .buttons {
      button {
        font-size: 11px;
      }
      .options {
        margin-left: 0.5rem;
        button {
          .icon {
            font-size: 20px;
          }
        }
      }
    }
  }
`;

export default StyledStoryNavbar;
