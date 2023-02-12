import styled from "styled-components";

const StyledMessage = styled.div`
  width: fit-content;
  align-self: ${(p) => (p.isSelf ? "flex-end" : "flex-start")};
  display: flex;
  flex-direction: ${(p) => (p.isSelf ? "row-reverse" : "row")};
  align-items: center;

  .content {
    background-color: ${(p) => (p.isSelf ? "#ff6122" : "#ffb041")};
    color: #fff;
    margin: 1rem 0.5rem;
    padding: 5px 10px;
    border-radius: 15px;
  }
`;

export default StyledMessage;
