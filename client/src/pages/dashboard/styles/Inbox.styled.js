import styled from "styled-components";

const StyledInbox = styled.div`
  margin: 0 auto;
  width: fit-content;
  margin-top: 3rem;
  padding: 2rem 1rem;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgb(120 120 120 / 25%);
  .privateConv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    text-decoration: none;
    color: #222;
    padding: 1rem 0.5rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .main {
      display: flex;
      text-decoration: none;

      .content {
        display: flex;
        flex-direction: column;
        margin-left: 0.5rem;
        .username {
          color: #222;
          font-weight: 700;
        }
      }
    }
  }
`;

export default StyledInbox;
