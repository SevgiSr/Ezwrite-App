import styled from "styled-components";

const StyledComment = styled.div`
  color: var(--font1);
  display: flex;
  flex-direction: row;
  padding: 10px 0;

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
        color: #ff6122;
      }
    }
  }
`;

export default StyledComment;
