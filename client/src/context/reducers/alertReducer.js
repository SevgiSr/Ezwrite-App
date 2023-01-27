import { CLEAR_ALERT, BEGIN, SUCCESS, ERROR } from "../actions";

const initialAlertState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
};

const alertReducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }

  if (action.type === ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
};

export { alertReducer, initialAlertState };
