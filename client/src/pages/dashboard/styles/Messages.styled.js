import styled from "styled-components";

const StyledMessages = styled.div`
  margin: 0 auto;
  padding: 2.5rem 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;

  .title {
    font-size: 18px;
    color: var(--font3);
    font-weight: 600;
    margin-bottom: 1.7rem;
  }

  .messages {
    background-color: var(--background5);
    border-radius: 15px;
    height: 57vh;
    width: 100%;
    padding: 1rem;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #6f6f6f;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  @media only screen and (max-width: 540px) {
  }

  @media only screen and (max-width: 790px) {
  }
`;

export default StyledMessages;
