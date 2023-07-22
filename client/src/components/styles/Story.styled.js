import styled from "styled-components";

const StyledStory = styled.div`
  color: #222;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;

  .content {
    margin-left: 10px;

    .title {
      color: var(--font1);
      text-decoration: none;
      cursor: pointer;
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
      word-break: break-word;
    }
  }

  .modal-content {
    display: flex;
    flex-direction: row;

    .modal-details {
      position: relative;
      margin-left: 1rem;
      color: var(--font1);
      overflow: hidden;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
      font-size: 12px;
      flex-grow: 1;
      .modal-title {
        font-weight: 700;
        font-size: 22px;
        margin-bottom: 10px;
      }
      .user-line {
        margin-bottom: 10px;
      }
      .modal-description {
      }
      .details-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        font-size: 20px;
        text-decoration: none;
        color: var(--font1);
        cursor: pointer;
        .details-icon {
          padding-top: 0;
          transition: padding-top 0.2s ease-in-out;
        }
      }
      .details-btn:hover .details-icon {
        padding-top: 10px;
      }
      .read-btn {
        position: absolute;
        bottom: 0;
        width: 98%;
      }
    }
  }
`;

export default StyledStory;
