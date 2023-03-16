import React from "react";
import StyledBouncingBallsLoader from "./styles/BouncingBallsLoader.styled";

const BouncingBallsLoader = () => {
  return (
    <StyledBouncingBallsLoader>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
    </StyledBouncingBallsLoader>
  );
};

export default BouncingBallsLoader;
