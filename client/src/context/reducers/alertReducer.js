import { CLEAR_ALERT, BEGIN, SUCCESS, ERROR } from "../actions";

const initialAlertState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  id: "",
};

const alertReducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      alertType: "",
      alertText: "",
      id: "",
    };
  }
  if (action.type === BEGIN) {
    return {
      ...state,
      isLoading: true,
      id: action.payload?.id,
    };
  }
  if (action.type === SUCCESS) {
    if (action.payload?.showAlert) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: action.payload?.msg,
      };
    } else {
      return {
        ...state,
        isLoading: false,
      };
    }
  }

  if (action.type === ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload?.msg,
    };
  }
};

export { alertReducer, initialAlertState };
