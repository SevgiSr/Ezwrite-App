import { useContext } from "react";
import { AppContext } from "../context/appContext";

function Alert() {
  const { reducerState } = useContext(AppContext);
  return (
    <div className={`alert alert-${reducerState.alertType}`}>
      {reducerState.alertText}
    </div>
  );
}

export default Alert;
