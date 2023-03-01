import styled from "styled-components";

const StyledStory = styled.div`
  color: #222;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border-radius: 4px;

  .content {
    margin-left: 10px;
    word-wrap: break-word;

    .title {
      color: #222;
      text-decoration: none;
      h3 {
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
        width: fit-content;
        border-bottom: 2px solid transparent;
      }
      h3:hover {
        border-bottom: 2px solid #222;
      }
    }

    .author {
      margin-bottom: 5px;
    }

    .meta-data {
      color: #6f6f6f;
      display: flex;
      font-size: 12px;
      width: fit-content;
      > * {
        display: flex;
        margin-right: 10px;
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 3px;
        }
      }
    }

    .description {
      color: #6f6f6f;
      font-size: 12px;
      line-height: 21px;
    }
  }
`;

export default StyledStory;
