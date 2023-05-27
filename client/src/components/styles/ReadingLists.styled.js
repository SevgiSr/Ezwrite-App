import styled from "styled-components";

const StyledReadingLists = styled.div`
  padding: 1rem 1.5rem;
  font-size: 24px;
  font-weight: 600;
  color: #222;
  header {
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }

  .readingList {
    margin-bottom: 2rem;
    .title {
      .text {
        border-bottom: 3px solid transparent;
      }
      .text:hover {
        border-bottom: 3px solid #222;
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
      .title {
        display: block;
        font-size: 15px;
        line-height: 18px;
        font-weight: 600;
        color: #222;
        height: 35px;
        overflow: hidden;
      }
      .meta-data {
        width: 100%;
        justify-content: space-between;
        color: #6f6f6f;
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
