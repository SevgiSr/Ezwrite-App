import styled from "styled-components";

const StyledEditStoryDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 7rem 0;
  box-sizing: border-box;
  .story-navbar {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    background-color: var(--background3);
    height: auto;
    padding: 15px 8px;
    header {
      display: flex;
      .back-btn {
        height: 100%;
        display: flex;
        align-items: center;
        .icon {
          font-size: 30px;
          margin-right: 10px;
        }
      }
    }
    .story {
      .title {
        font-size: 21px;
        font-weight: 600;
      }
    }
    button {
      margin-right: 20px;
      padding: 7px 13px;
    }
  }

  .story-manage {
    display: flex;
    flex-direction: column;
    margin-right: 50px;

    .view-btn {
      padding: 10px 20px;
      width: 70%;
      text-decoration: none;
      margin: 0 auto;
    }
    .cover {
      margin-bottom: 1rem;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .cover-overlay {
        background-color: #eee;
        width: 280px;
        height: 437px;

        .pulse-loader {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .title {
        position: absolute;
        top: 30px;
        text-align: center;
        color: #fff;
      }

      .upload-picture {
        position: absolute;
        bottom: -2px;
        width: 100%;
        input {
          display: none;
        }
        .edit-cover-btn {
          padding: 14px 0;
          background-color: #00b2b2;
          font-size: 16px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  .chapters-main {
    width: 600px;
    background-color: var(--background5);

    header {
      border-bottom: 1px solid #eee;
      padding: 0 20px;
    }
    .details {
      width: 100%;
    }
    button {
      padding: 8px 20px;
      margin: 20px 10px;
    }
    .row {
      display: flex;
      padding: 10px 30px;
      .bars-icon {
        font-size: 25px;
        margin-right: 20px;
      }
      .options {
        position: relative;
        right: -18px;
        .dropdown-item {
          padding: 10px;
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
          padding: 0 15px;
          margin: 0;
          border: none;
          cursor: pointer;
          background-color: var(--background5);
          color: var(--font2);
          .icon {
            margin-right: 0;
            font-size: 38px;
          }
        }
      }
      .chapter {
        display: flex;
        flex-direction: column;
        width: 40vw;
        padding: 10px 0;
        .title {
          width: fit-content;
          font-size: 18px;
          font-weight: 700;
          color: var(--font1);
          border-bottom: 3px solid transparent;
          &:hover {
            border-bottom: 3px solid #000;
          }
        }

        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .metadata {
            width: 200px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;

    .chapters-main {
      width: 90vw;
      margin-top: 2rem;
    }
  }
`;

export default StyledEditStoryDetails;
