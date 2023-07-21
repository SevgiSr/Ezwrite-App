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
      color: var(--font1);
      text-decoration: none;
      .visibility {
        margin-left: 10px;
        background-color: #6f6f6f;
        padding: 3px 5px;
        border-radius: 20px;
      }
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
      color: var(--font1);
    }

    .meta-data {
      color: var(--font2);
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
      margin-top: 7px;
      color: var(--font1);
      font-size: 12px;
      line-height: 21px;
    }
  }
`;

export default StyledStory;
