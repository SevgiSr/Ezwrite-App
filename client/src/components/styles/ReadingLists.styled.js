import styled from "styled-components";

const StyledReadingLists = styled.div`
  padding: 1rem 1.5rem;
  font-size: 24px;
  font-weight: 600;
  color: var(--font1);
  header {
    border-bottom: 1px solid var(--font1);
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  .readingList {
    margin-bottom: 2rem;
    .stories {
      display: flex;
    }
    .title {
      .text {
        border-bottom: 3px solid transparent;
      }
      .text:hover {
        border-bottom: 3px solid var(--font1);
      }
      width: fit-content;
      text-decoration: none;
      color: inherit;
      margin-bottom: 0.7rem;
      display: flex;
      align-items: center;
    }

    .story {
      width: 123px;
      margin-right: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      .title {
        display: block;
        font-size: 15px;
        line-height: 18px;
        font-weight: 600;
        color: var(--font1);
        height: 35px;
        overflow: hidden;
        margin-top: 10px;
        text-decoration: underline transparent solid 2px;

        :hover {
          text-decoration: underline var(--text-main-orange) solid 2px;
        }
      }
      .meta-data {
        width: 88%;
        justify-content: space-between;
        color: var(--font2);
        display: flex;
        font-size: 12px;
        font-weight: 300;

        > * {
          display: flex;

          .icon {
            margin-right: 3px;
          }
        }
      }
    }
  }
`;

export default StyledReadingLists;
