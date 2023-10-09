import { useContext } from "react";
import { UserContext } from "../context/userContext";
import styled, { keyframes } from "styled-components";
import { MdOutlineErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Alert({ state }) {
  if (!state.showAlert) return null;
  return (
    <StyledAlert>
      <div className={`alert alert-${state.alertType}`}>
        {" "}
        {state.alertType === "error" ? (
          <div className="icon">
            <MdOutlineErrorOutline />
          </div>
        ) : (
          <div className="icon">
            <AiOutlineCheckCircle size={20} color="#2e6b2c" />
          </div>
        )}
        {state.alertText}
      </div>
    </StyledAlert>
  );
}

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledAlert = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  z-index: 99999;

  .alert {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--font1);
    padding: 13px 20px;
    min-width: 350px;
    font-size: 17px;
    font-weight: 600;

    .icon {
      font-size: 25px;
      margin-right: 5px;
    }
  }
  .alert-success {
    background-color: #81c784;
    color: #2e6b2c;
  }

  .alert-error {
    background-color: #e57373;
    color: #b22424;
  }
  animation: ${slideDown} 0.3s ease-out;
`;

export default Alert;
