import styled from "styled-components";

const StyledInbox = styled.div`
  padding: 2rem 20px;
  margin: 0 auto;
  max-width: 900px;

  h1 {
    font-weight: 600;
    margin-bottom: 1.7rem;
    color: #6f6f6f;
  }

  .inbox {
    background-color: var(--background5);
    padding: 30px 50px;
    .fallback {
      text-align: center;
    }

    .privateConv {
      margin: 0 auto;
      color: var(--font1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 500px;
      text-decoration: none;
      padding: 1rem 0.5rem;
      border-top: 1px solid var(--font2);
      border-bottom: 1px solid var(--font2);
      .main {
        display: flex;
        text-decoration: none;

        .content {
          display: flex;
          flex-direction: column;
          margin-left: 0.5rem;
          .username {
            font-weight: 700;
          }
        }
      }
    }
  }
`;

export default StyledInbox;
