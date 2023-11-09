import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const LoadingScreen = () => {
  return (
    <Styled>
      <div className="spinner">
        <Oval
          height={80}
          width={80}
          color="#ff6122"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ffb041"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  position: absolute;
  top: 0;
  left: 230px;
  bottom: 0;
  right: 0;
  overflow: hidden;
  height: 100%;
  width: calc(100% - 230px);

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media only screen and (max-width: 900px) {
    left: 0;
    width: 100%;
  }
`;

export default LoadingScreen;
