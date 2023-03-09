import styled from "styled-components";

const StyledNotifications = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  color: #222;
  span {
    font-weight: 700;
  }
  .nt-parent {
    width: 60%;
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
      box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
      margin-top: 1.5rem;
      padding: 10px 20px;
    }
  }
`;

export default StyledNotifications;
