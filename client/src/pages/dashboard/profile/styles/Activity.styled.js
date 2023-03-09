import styled from "styled-components";

const StyledActivity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 5rem;
  color: #222;

  .row {
    display: flex;
    align-items: center;
  }
  .notification {
    width: 600px;
    color: #6f6f6f;
    box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
    margin-top: 1.5rem;
    padding: 10px 20px;
    display: flex;
    align-items: start;

    &:hover {
      background-color: #eee;
    }

    header {
      margin-bottom: 5px;
    }

    .icon {
      margin-right: 5px;
    }
    .date {
      font-size: 13px;
      line-height: 18px;
    }
    .profilePicture {
      margin-right: 10px;
      margin-top: 6px;
    }
    .content {
      font-size: 14px;
    }
  }
`;

export default StyledActivity;
