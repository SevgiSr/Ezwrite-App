import styled from "styled-components";

const StyledActivity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 5rem;

  .row {
    display: flex;
    align-items: center;
  }
  .notification {
    width: 600px;
    color: var(--font1);
    box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
    margin-top: 1.5rem;
    padding: 10px 20px;
    display: flex;
    align-items: start;
    background-color: var(--background5);

    &:hover {
      background-color: var(--background4);
    }

    header {
      margin-bottom: 5px;
    }

    .icon {
      margin-right: 5px;
      color: var(--icons);
    }
    .date {
      font-size: 13px;
      line-height: 18px;
      color: var(--font2);
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
