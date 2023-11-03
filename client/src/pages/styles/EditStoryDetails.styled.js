import styled from "styled-components";

const StyledEditStoryDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 0 auto;
  max-width: 1280px;
  padding: 8rem 20px;
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
          color: var(--font1);
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
      margin-left: 10px;
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
        height: calc(280px * (125 / 80));

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
    width: 100%;
    background-color: var(--background5);

    .new-part-btn {
      margin-left: 1.5rem;
    }

    header {
      border-bottom: 1px solid #eee;
      padding: 0 20px;
      margin-bottom: 1.7rem;

      ul {
        list-style-type: none;
        display: flex;
        li {
          font-size: 16px;
          color: var(--font2);
          font-weight: 600;
          padding: 10px 10px;
          margin: 10px 0;
          border-radius: 10px;
          cursor: pointer;
        }

        .active {
          background-color: var(--background3);
        }
      }
    }
    .details {
      width: 100%;
    }
    .chapter-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      .bars-icon {
        font-size: 25px;
        margin-right: 20px;
      }
      .chapter {
        display: flex;
        align-items: start;
        justify-content: start;
        .info {
          color: var(--font2);
        }
        .metadata {
          margin: 0;
          margin-top: 10px;
        }
      }

      .metadata {
        margin: 0 auto;
        max-width: 200px;
      }

      .options {
        margin-left: auto;
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

  @media only screen and (max-width: 540px) {
    .story-navbar {
      .story {
        span {
          font-size: 13px;
        }
        .title {
          font-size: 18px;
        }
      }
      button {
        margin-left: 5px;
      }
    }

    .chapters-main {
      header {
        ul {
          justify-content: center;
          li {
            font-size: 15px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 790px) {
    .chapters-main {
      .chapter-row {
        padding: 10px 20px;
        .chapter {
          .title {
            font-size: 14px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;

    .story-manage {
      margin-right: 0;
      .cover {
        .cover-overlay {
          width: 210px;
          height: calc(210px * (125 / 80));
        }
      }
    }

    .chapters-main {
      margin-top: 2rem;
    }
  }
`;

export default StyledEditStoryDetails;
