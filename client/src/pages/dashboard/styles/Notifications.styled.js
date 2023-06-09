import styled from "styled-components";

const StyledNotifications = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  color: #222;
  .row {
    display: flex;
    align-items: center;
  }
  span {
    font-weight: 700;
  }
  .nt-parent {
    width: fit-content;
    width: 60vw;
    .header {
      display: flex;
      justify-content: space-between;

      h1 {
        color: #222;
        font-weight: 600;
        margin-bottom: 6px;
        color: #6f6f6f;
      }
    }

    .notification {
      color: var(--font1);
      background-color: var(--background5);
      box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
      margin-top: 1.5rem;
      padding: 10px 20px;
      display: flex;
      align-items: start;

      &:hover {
        background-color: var(--background4);
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
  }
`;

export default StyledNotifications;
