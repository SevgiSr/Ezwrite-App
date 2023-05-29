import styled from "styled-components";

const StyledStory = styled.div`
  display: flex;

  flex-direction: column;
  overflow: hidden;
  main {
    display: flex;
    justify-content: center;
    padding-bottom: 8rem;
  }
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
    .cover {
      width: 30vw;
      min-width: 96px;
      max-width: 184px;
    }
    .info {
      button {
        margin-top: 2rem;
        padding: 10px;
        border-radius: 3px;
      }
      margin: 24px;
      h3 {
        margin-bottom: 2rem;
        font-weight: 700;
        font-size: 32px;
        line-height: 40px;
      }

      .stats {
        display: flex;
        justify-content: space-between;
        width: 300px;
        color: var(--font2);

        .item {
          padding-right: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid var(--font2);

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
  @media only screen and (min-width: 781px) {
    section {
      min-width: 300px;
      max-width: 700px;
      padding-top: 24px;
    }
  }
  @media only screen and (min-width: 911px) {
    section {
      margin-right: 40px;
    }
  }
`;

export default StyledStory;
