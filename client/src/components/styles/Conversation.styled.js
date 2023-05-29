import styled from "styled-components";

const StyledConversation = styled.article`
  color: var(--font1);
  background-color: var(--background5);
  padding: 20px 20px;
  margin-top: 1.7rem;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;

    #info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      div {
        h3 {
          font-weight: 600;
          font-size: 16px;
          line-height: 16px;
          color: var(--font1);
        }
        p {
          font-size: 13px;
          line-height: 18px;
        }
      }
    }
  }
  main {
    overflow-wrap: break-word;
    margin-bottom: 1rem;
    font-size: 16px;
    line-height: 21px;
  }
`;

export default StyledConversation;
