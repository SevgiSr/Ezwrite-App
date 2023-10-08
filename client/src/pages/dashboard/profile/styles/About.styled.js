import styled from "styled-components";

const StyledAbout = styled.div`
  display: flex;
  justify-content: space-between;

  .info {
    box-sizing: border-box;
    font-size: 15px;
    color: var(--font1);
    background-color: var(--background5);
    border-radius: 9px;
    width: 28%;
    padding: 1rem;
    height: fit-content;
    .pronouns {
      border-bottom: 1px solid var(--text-main);
      margin-bottom: 10px;
      width: fit-content;
    }
    .location {
      display: flex;
      padding: 10px 0;
      .icon {
        margin-right: 5px;
        color: var(--text-main);
      }
    }
    .joined {
      padding: 10px 0;

      span {
        font-weight: 600;
      }
    }

    .website {
      display: flex;
      cursor: pointer;
      padding: 10px 0;
      border-bottom: 1px solid var(--font2);
      margin-bottom: 1rem;
      .text {
        border-bottom: 1px solid transparent;
        :hover {
          border-bottom: 1px solid var(--text-main);
        }
      }

      .icon {
        margin-right: 5px;
        color: var(--text-main);
      }
    }
  }
  .work-info {
    width: 68%;
    background-color: var(--background5);
    border-radius: 9px;
    color: var(--font1);
    .stories {
      padding: 1rem;

      .stories-header {
        margin-bottom: 1.5rem;
        h3 {
          font-size: 24px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          .edit-icon {
            cursor: pointer;
            font-size: 30px;
            display: flex;
            align-items: center;
          }
        }
        .meta-data {
          display: inline-block;
          margin-top: 5px;
          font-size: 15px;
          color: var(--font2);
          span {
            margin-right: 10px;
          }
        }
      }
      .show-more {
        width: 100%;
        background-color: #eee;
        color: #6f6f6f;
        text-align: center;
        border: none;
        font-size: 16px;
        padding: 0.6rem 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          margin-left: 10px;
        }
        :hover {
          color: #6f6f6f;
        }
      }
    }

    .readingLists {
      padding: 1rem 1.5rem;
      header {
        border-bottom: 1px solid var(--font1);
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        font-size: 24px;
        font-weight: 600;
      }
      .stories {
        padding: 0;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    .info {
      width: 100%;
      margin-bottom: 1rem;
    }
    .work-info {
      width: 100%;
    }
  }
`;

export default StyledAbout;
