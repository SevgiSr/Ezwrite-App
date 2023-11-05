import styled from "styled-components";

const StyledStory = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 5rem;

  > * {
    width: 100%;
  }
  .story-card {
    padding: 4rem 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
    background-color: var(--background5);
    color: var(--font1);

    .info {
      margin-left: 24px;
      button {
        margin-top: 2rem;
        padding: 10px;
        border-radius: 3px;
      }
      h3 {
        font-weight: 700;
        font-size: 32px;
        line-height: 40px;
      }
      .visibility {
        margin-left: 10px;
        padding: 3px 5px;
        background-color: #6f6f6f;
        border-radius: 20px;
      }

      .stats {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        width: 300px;
        color: var(--font2);

        .item {
          margin-right: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;

          .label {
            display: flex;
            align-items: center;
            font-size: 12px;
            line-height: 16px;
            svg {
              margin-right: 5px;
            }
          }
          .value {
            color: var(--font1);
            font-size: 14px;
            font-weight: 700;
            line-height: 20px;
            margin-top: 4px;
          }
        }
      }
    }
  }

  main {
    display: flex;
    justify-content: space-between;
    padding: 25px 30px 1rem;
    box-sizing: border-box;
    .info-section {
      width: 45%;
      .story-info {
        .author {
          margin: 1rem 0;
          display: flex;
          align-items: center;
          .username {
            margin-left: 0.5rem;
            font-size: 18px;
            line-height: 24px;
          }
        }
        .status {
          margin-bottom: 1rem;
          background-color: #121212;
          color: white;
          width: fit-content;
          border-radius: 8px;
          padding: 5px 10px;
        }
        .desc {
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
        }
        .tag {
          background-color: #121212;
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 1rem;
        }
      }

      .table-contents {
        box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
        margin-top: 3rem;
        padding: 1rem;
        background-color: var(--background5);

        li {
          list-style-type: decimal;
          margin: 1rem;
          border-bottom: 3px solid transparent;
          width: fit-content;
          font-size: 17px;
          > * {
            text-decoration: none;
            color: var(--font1);
          }
          :hover {
            border-bottom: 3px solid var(--text-main-orange);
          }
        }
      }
    }

    .comments-section {
      width: 45%;

      .comments {
        max-width: 550px;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .story-card {
      flex-direction: column;
      text-align: center;
      .info {
        margin-top: 1rem;
        margin-left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
    main {
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      padding: 0 25px;
      .info-section {
        width: 100%;
        margin: 0;
        margin-bottom: 2.5rem;
      }
      .comments-section {
        margin: 0;
        width: 100%;
        .comments {
          margin: 0 auto;
        }
      }
    }
  }
`;

export default StyledStory;
