import styled from "styled-components";

const StyledComment = styled.div`
  color: var(--font1);
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  width: 98%;
  margin: 0 auto;

  .main {
    display: flex;
    flex-direction: column;
    margin: 0 5px;
    .content {
      overflow-wrap: break-word;
      .username {
        color: var(--font1);
        font-weight: 600;
        margin-right: 7px;
        line-height: 16px;
        font-size: 16px;
      }
      .text {
        font-size: 16px;
        line-height: 21px;
        color: var(--font1);
      }
    }

    .info {
      .date {
        font-size: 13px;
        color: var(--font2);
      }
      .reply {
        color: var(--text-main);
      }
    }
  }

  .options {
    margin-left: auto;
    .dropdown-item {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--font1);
      .icon {
        font-size: 15px;
        margin-right: 5px;
      }
    }
    button {
      border: none;
      cursor: pointer;
      background-color: var(--background5);
      color: var(--font2);
      .icon {
        font-size: 18px;
      }
    }
  }
`;

export default StyledComment;
