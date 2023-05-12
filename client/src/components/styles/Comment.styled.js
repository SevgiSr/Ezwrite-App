import styled from "styled-components";

const StyledComment = styled.div`
  color: #6f6f6f;
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
        color: black;
        font-weight: 600;
        margin-right: 7px;
        line-height: 16px;
        font-size: 16px;
      }
      .text {
        font-size: 16px;
        line-height: 21px;
        color: #6f6f6f;
      }
    }

    .info {
      .date {
        font-size: 13px;
        color: #6f6f6f;
      }
      .reply {
        color: #ff6122;
      }
    }
  }
`;

export default StyledComment;
