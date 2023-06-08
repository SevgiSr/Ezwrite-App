import styled from "styled-components";

const StyledStoryDetailed = styled.div`
  color: var(--font1);
  background-color: var(--background5);
  padding: 1.5rem;
  border-radius: 4px;
  width: 420px;
  height: 250px;

  div {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .link {
    display: flex;
    flex-direction: row;
  }

  .cover {
    margin-right: 8px;
    > * {
      border-radius: 5px;
    }
  }

  .content {
    margin-left: 10px;
    overflow: hidden; /* Added this line to prevent content overflow */

    .title {
      width: 100%; /* Set this to 100% so it takes up full width of parent */
      word-wrap: break-word; /* Break words at the end of the line */
      overflow-wrap: break-word; /* Same as word-wrap but more modern. Use both for maximum compatibility */
      white-space: normal; /* Ensures text can break into a new line */
      font-weight: 700;
      font-size: 22px;
      line-height: 24px;
      color: var(--font1);
    }

    .author {
      margin: 10px 0;
    }

    .meta-data {
      color: var(--font2);
      display: flex;
      width: fit-content;
      margin: 10px 0;
      > * {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 10px;
        border-right: 1px solid var(--font2);
        padding-right: 8px;

        .count {
          font-size: 12px;
          font-weight: 700;
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;

          span {
            margin-left: 3px;
          }
        }
      }
      > :last-child {
        border-right: none;
      }
    }

    .description {
      color: var(--font1);
      overflow: hidden;
      word-wrap: break-word;
      margin-top: 7px;
      font-size: 12px;
      line-height: 21px;
    }
  }
`;

export default StyledStoryDetailed;
