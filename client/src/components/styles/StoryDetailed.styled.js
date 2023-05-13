import styled from "styled-components";

const StyledStoryDetailed = styled.div`
  color: #222;
  padding: 1.5rem;
  border-radius: 4px;
  width: 420px;
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

    .title {
      font-weight: 700;
      font-size: 22px;
      line-height: 28px;
      color: #121212;
    }

    .author {
      margin: 10px 0;
    }

    .tags {
      margin: 17px 0;
      .tag {
        font-size: 12px;
        background-color: #222;
        color: #fff;
        margin-right: 5px;
        padding: 4px 7px;
        border-radius: 10px;
      }
    }

    .meta-data {
      color: #6f6f6f;
      display: flex;
      font-size: 12px;
      width: fit-content;
      margin: 10px 0;
      > * {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 10px;
        border-right: 1px solid #eee;
        padding-right: 16px;
        font-size: 12px;
        color: #6f6f6f;
        .count {
          color: #000;
          font-size: 13px;
          font-weight: 700;
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;

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
      overflow: hidden;
      word-wrap: break-word;
      margin-top: 7px;
      color: #222;
      font-size: 12px;
      line-height: 21px;
    }
  }
`;

export default StyledStoryDetailed;
