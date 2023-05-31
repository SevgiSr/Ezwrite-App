import { Oval } from "react-loader-spinner";

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        overflow: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        className="spinner"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
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
    </div>
  );
};

export default LoadingScreen;
