import styled from "styled-components";

const StyledNotifications = styled.div`
  padding: 2rem 20px;
  margin: 0 auto;
  max-width: 900px;

  .row {
    display: flex;
    align-items: center;
  }
  span {
    font-weight: 700;
  }

  .header {
    display: flex;
    justify-content: space-between;

    h1 {
      color: #222;
      font-weight: 600;
      margin-bottom: 1.7rem;
      color: #6f6f6f;
    }
  }

  .notifications-container {
    .fallback {
      padding: 30px 50px;
      text-align: center;
    }
    .unread {
      border: 1.3px solid var(--dark-orange);
    }
    .notification {
      color: var(--font1);
      background-color: var(--background5);
      box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
      margin-bottom: 1.5rem;
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
