import styled from "styled-components";

const StyledInbox = styled.div`
  margin: 0 auto;
  width: fit-content;
  padding-top: 5rem;
  width: 680px;
  color: var(--font1);

  .no-messages {
    padding: 40px 50px;
    background-color: var(--background5);
    text-align: center;
    border-radius: 7px;

    .text {
      margin-top: 35px;
      font-size: 24px;
      font-weight: 400;
      line-height: 30px;
    }
    .icon {
      font-size: 230px;
      margin: 0 auto;
    }

    button {
      margin-top: 2.5rem;
    }
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
