import styled from "styled-components";

const StyledConversation = styled.article`
  color: #6f6f6f;
  box-shadow: 0 2px 5px rgb(120 120 120 / 25%);
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
      width: 95px;

      div {
        h3 {
          font-weight: 600;
          font-size: 16px;
          line-height: 16px;
        }
        p {
          font-size: 14px;
          line-height: 18px;
        }
      }
    }
  }
  main {
    overflow-wrap: break-word;
    margin-bottom: 1rem;
  }
`;

export default StyledConversation;
