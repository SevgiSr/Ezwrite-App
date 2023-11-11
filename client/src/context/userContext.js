// even if we're deploying our app to the internet,
// when sending api requests to our backend,
// we don't use full url
// but relative routes instead
import React, { useReducer } from "react";
import axios from "axios";
import userReducer from "./reducers/userReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";

import {
  BEGIN,
  CLEAR_ALERT,
  ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_SUCCESS,
  SUCCESS,
} from "./actions";
import { useNavigate } from "react-router-dom";

// i want to save my login data to browser
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialUserState = {
  //user
  user: user ? JSON.parse(user) : null,
  token: token,
};

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    initialAlertState
  );

  //when ure sending request from frontend to backend with axios,
  // the backend jwt-auth middleware expecting a header starting with 'Bearer' and the token
  // but in default axios we dont have that header
  const authFetch = axios.create({
    baseURL: "/api",
    //I can add headers here but this will cause send that token in each axios request
  });

  //request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${userState.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (axios.isCancel(error)) {
        // This is a cancellation error, so we can either ignore it or log it as a debug message
        console.debug("Request was canceled", error.message);
      } else {
        // Handle other errors
        console.log(error);
        if (error.response?.status === 401) {
          logoutUser();
        }
      }
      // For cancellation errors, you may not want to reject the promise
      // If you still want to reject, ensure that you are handling these gracefully where the promise is consumed
      return Promise.reject(error);
    }
  );

  const clearAlert = () => {
    setTimeout(() => {
      alertDispatch({ type: CLEAR_ALERT });
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
    alertDispatch({ type: BEGIN });
    try {
      //user created in db. token created and sent back
      const { data } = await axios.post("/api/auth/register", currentUser);

      const { user, token } = data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      });

      alertDispatch({
        type: SUCCESS,
        payload: { msg: "Register Successful! Redirecting..." },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      alertDispatch({
        type: ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    alertDispatch({ type: BEGIN });
    try {
      const { data } = await axios.post("/api/auth/login", currentUser);
      const { user, token } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });

      alertDispatch({
        type: SUCCESS,
        payload: { msg: "Login Successful! Redirecting..." },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      alertDispatch({
        type: ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <UserContext.Provider
      value={{
        userState,
        registerUser,
        loginUser,
        logoutUser,
        initialUserState,
        alertState,
        authFetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
