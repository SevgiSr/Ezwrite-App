import styled from "styled-components";

const StyledStory = styled.div`
  display: flex;
  padding: 4rem 0;
  flex-direction: column;
  overflow: hidden;
  > * {
    width: 100%;
  }
  .story-card {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
    .cover {
      width: 30vw;
      min-width: 96px;
      max-width: 184px;
    }
    .info {
      button {
        margin-top: 1rem;
        padding: 10px;
      }
      margin: 24px;
      h3 {
        margin-bottom: 2rem;
        font-weight: 700;
        font-size: 32px;
        line-height: 40px;
        color: #121212;
      }

      .stats {
        display: flex;
        justify-content: space-between;
        width: 300px;

        .item {
          padding-right: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid #eee;

          .label {
            display: flex;
            align-items: center;
            color: rgba(18, 18, 18, 0.64);
            font-size: 12px;
            line-height: 16px;
            svg {
              margin-right: 5px;
            }
          }
          .value {
            color: #121212;
            font-size: 14px;
            font-weight: 700;
            line-height: 20px;
            margin-top: 4px;
          }
        }
      }
    }
  }

  .story-info {
    padding: 24px;
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
  }

  .table-contents {
    box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
  }
`;

export default StyledStory;
