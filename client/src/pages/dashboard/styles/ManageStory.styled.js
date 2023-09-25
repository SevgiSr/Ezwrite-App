import styled from "styled-components";

const StyledManageStory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1280px;
  padding: 3rem 20px;

  > * {
    width: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.7rem;
    .story-title {
      margin: 10px 0;
      font-size: 25px;
      font-weight: 600;
    }
    .edit-story-btn {
      display: flex;
      align-items: center;
      .icon {
        font-size: 18px;
        margin-right: 5px;
      }
    }
  }

  .main {
    max-width: 790px;
  }

  .story-nav {
    margin-bottom: 12px;
  }
  .chapters-container {
    .chapters {
      .chapter {
        padding: 13px 20px;
        background-color: var(--background2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        header {
          display: flex;
          align-items: center;

          .title {
            font-size: 17px;
          }
          .status {
            background-color: var(--background1);

            font-size: 12px;
            border-radius: 10px;
            padding: 7px 12px;
            margin-left: 10px;
          }

          .updated {
            color: var(--font2);
          }
        }
      }
    }
  }

  .collabs-container {
    .collab {
      padding: 13px 20px;
      background-color: var(--background2);
      display: flex;
      align-items: center;
      .collab-text {
        margin: 0 10px;
      }
      .collab-btn {
        margin-left: auto;
      }
    }
  }

  .pulls-container {
    .pull-request {
      padding: 13px 20px;
      background-color: var(--background2);
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 18px;
        font-weight: 600;
      }
      .desc {
        color: var(--font2);
      }
      .author {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-top: 10px;
        .text {
          margin-right: 10px;
        }
      }
      .actions {
        display: flex;
        .preview-btn {
          display: flex;
          width: fit-content;
          .icon {
            margin-right: 5px;
            font-size: 18px;
          }
        }
      }
    }
  }
  .no-content-container {
    padding: 30px 50px;
    background-color: var(--background5);
    text-align: center;

    .text {
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
      margin-top: 20px;
    }
    .icon {
      font-size: 90px;
      margin: 0 auto;
    }

    button {
      margin-top: 2.5rem;
    }
  }

  @media only screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: 300px 1fr;
    justify-content: center;
    align-items: start;
  }
`;

export default StyledManageStory;
