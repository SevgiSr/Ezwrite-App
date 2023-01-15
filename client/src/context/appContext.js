// even if we're deploying our app to the internet,
// when sending api requests to our backend,
// we don't use full url
// but relative routes instead
import React, { useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";

import {
  CLEAR_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "./actions";

// i want to save my login data to browser
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialState = {
  //user
  user: user ? JSON.parse(user) : null,
  token: token,

  //alerts - load, success, error
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
};

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [reducerState, dispatch] = useReducer(reducer, initialState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      //user created in db. token created and sent back
      const response = await axios.post("/auth/register", currentUser);

      const { user, token } = response.data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/auth/login", currentUser);
      const { user, token } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        reducerState,
        registerUser,
        loginUser,
        logoutUser,
        initialState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
