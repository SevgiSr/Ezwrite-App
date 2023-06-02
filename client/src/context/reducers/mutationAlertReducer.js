import {
  MUTATION_BEGIN,
  MUTATION_SUCCESS,
  MUTATION_ERROR,
  CLEAR_ALERT,
} from "../actions";

const initialMutationState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  id: "",
};

const mutationAlertReducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === MUTATION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === MUTATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === MUTATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload?.msg,
    };
  }
};

export { mutationAlertReducer, initialMutationState };
