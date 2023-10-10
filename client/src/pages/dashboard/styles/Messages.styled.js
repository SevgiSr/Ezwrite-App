import styled from "styled-components";

const StyledMessages = styled.div`
  width: fit-content;
  margin: 0 auto;
  margin-top: 2.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 18px;
    color: var(--font3);
    font-weight: 600;
    margin-bottom: 1.7rem;
  }

  .messages {
    background-color: var(--background5);
    border-radius: 15px;
    height: 600px;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #6f6f6f;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
`;

export default StyledMessages;
