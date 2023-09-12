import styled from "styled-components";

const StyledStoryCardMini = styled.div`
  width: 90px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--background4);
  padding: 15px 30px;
  border-radius: 9px;

  .title {
    width: 100%; /* Set this to 100% so it takes up full width of parent */
    word-wrap: break-word; /* Break words at the end of the line */
    overflow-wrap: break-word; /* Same as word-wrap but more modern. Use both for maximum compatibility */
    white-space: normal; /* Ensures text can break into a new line */
    word-break: break-word;
    font-size: 10px;
    color: var(--font1);
    margin-top: 10px;
    text-decoration: underline transparent solid 2px;

    :hover {
      text-decoration: underline var(--text-main-orange) solid 2px;
    }
  }
`;

export default StyledStoryCardMini;
