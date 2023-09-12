import styled from "styled-components";

const StyledUserLine = styled.div`
  display: flex;
  align-items: center;

  .flex-item {
    .name {
      font-size: 16px;
      text-decoration: none;
      color: var(--font1);
    }
    .name:hover {
      color: #6f6f6f;
    }
    .details {
      font-size: 12px;
      color: var(--font2);
    }
  }

  .flex-item:last-child {
    margin-left: 5px;
  }
`;

export default StyledUserLine;
