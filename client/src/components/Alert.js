import { useContext } from "react";
import { UserContext } from "../context/userContext";

function Alert() {
  const { alertState } = useContext(UserContext);
  return (
    <div className={`alert alert-${alertState.alertType}`}>
      {alertState.alertText}
    </div>
  );
}

export default Alert;
