import styled from "styled-components";

const StyledStoryCardDetailed = styled.div`
  color: var(--font1);
  background-color: var(--background5);
  padding: 1.5rem;
  border: 1px solid #6f6f6f;
  border-radius: 10px;
  max-width: 483px;
  width: 100%;
  max-height: 320px;
  display: flex;

  div {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .cover {
    margin-right: 8px;
    cursor: pointer;
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
      cursor: pointer;
      :hover {
        color: var(--font2);
      }
    }

    .author {
      margin: 10px 0;
    }

    .description {
      color: var(--font1);
      overflow: hidden;
      word-wrap: break-word;
      font-size: 12px;
      line-height: 18px;
    }
  }

  @media only screen and (max-width: 540px) {
    padding: 1rem;
    .content {
      .title {
        font-size: 17px;
      }

      .metadata {
        > * {
          margin-right: 5px;
          font-size: 12px;

          .icon {
            font-size: 12px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 720px) {
  }
`;

export default StyledStoryCardDetailed;
