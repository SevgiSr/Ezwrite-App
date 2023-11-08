import styled from "styled-components";
import svg from "./layer1.svg";
const StyledRegister = styled.div`
  padding: 0 1.2rem;
  .blob {
    max-width: 600px;
    height: 700px;
    position: fixed;
    z-index: -1;
    top: 0px;
    left: 0;
  }
  .spacer {
    z-index: -2;
    aspect-ratio: 1200/300;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .layer1 {
    background-image: url(${svg});
  }

  svg {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .glass {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    backdrop-filter: blur(5px);
    --webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }

  .form {
    min-height: 370px;
    max-width: 500px;
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    label {
      color: #ffb041;
    }
    h3 {
      display: flex;
      flex-direction: row;
      font-weight: 500;
      color: #d25e00;
      font-size: 30px;
      margin-bottom: 1rem;
      text-shadow: 3px 5px 6px rgba(210, 94, 0, 0.4);
      .book-icon {
        display: flex;
        align-items: center;
        margin-left: 1rem;
      }
    }
    .isMember {
      color: #ffb041;
      margin-top: 2rem;
    }
  }
  .toggle-btn {
    margin-left: 1rem;
    font-size: 1rem;
  }
`;

export default StyledRegister;
