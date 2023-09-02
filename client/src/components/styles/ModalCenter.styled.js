import styled from "styled-components";

const StyledModalCenter = styled.div`
  .modal-content {
    position: fixed; /* Changed from absolute to fixed */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Changed from 50% to -50% */
    width: ${(props) => (props.width ? props.width : "550px")};
    z-index: 1000;
    background-color: var(--background3);
    border-radius: 5px;

    .close-modal-btn {
      border: none;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 25px;
      color: var(--button-main);
      cursor: pointer;
      background-color: var(--background3);
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    z-index: 999;
    opacity: 8%;
  }
`;

export default StyledModalCenter;
