import styled from "styled-components";

const StyledComment = styled.div`
  color: #6f6f6f;
  display: flex;
  flex-direction: row;

  padding: 10px 0;
  .content {
    overflow-wrap: break-word;
    /*  word-wrap: break-word; */
  }
  span {
    color: black;
    font-weight: 600;
    margin: 0 5px;
  }
`;

export default StyledComment;
