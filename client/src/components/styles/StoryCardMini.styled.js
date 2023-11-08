import styled from "styled-components";

const StyledStoryCardMini = styled.div`
  background-color: var(--background5);
  padding: 10px 15px;
  border-radius: 9px;
  width: 100%;

  .container {
    width: 100%;
    max-width: 100%;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .title {
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
    font-size: 13px;
    color: var(--font1);
    margin-top: 10px;
    text-decoration: underline transparent solid 2px;
    :hover {
      text-decoration: underline var(--text-main-orange) solid 2px;
    }
  }

  @media only screen and (max-width: 540px) {
    .title {
      font-size: 11px;
    }
  }
`;

export default StyledStoryCardMini;
