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
  }
`;

export default StyledNotifications;
