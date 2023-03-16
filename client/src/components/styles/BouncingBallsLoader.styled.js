import styled from "styled-components";

const StyledBouncingBallsLoader = styled.div`
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30px);
    }
  }

  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100vh;
  width: 100vw;

  .ball {
    width: 20px;
    height: 20px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #9b59b6;
    animation: bounce 1s ease-in-out infinite;
  }
  .ball:nth-child(2) {
    animation-delay: 0.3s;
  }
  .ball:nth-child(3) {
    animation-delay: 0.6s;
  }
`;

export default StyledBouncingBallsLoader;
