// even if we're deploying our app to the internet,
// when sending api requests to our backend,
// we don't use full url
// but relative routes instead
import React, { useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";

import {
  CLEAR_ALERT,
  CREATE_STORY_BEGIN,
  CREATE_STORY_ERROR,
  CREATE_STORY_SUCCESS,
  GET_MY_STORIES_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
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

  //all stories
  myStories: [],
};

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [reducerState, dispatch] = useReducer(reducer, initialState);

  //when ure sending request from frontend to backend with axios,
  // the backend jwt-auth middleware expecting a header starting with 'Bearer' and the token
  // but in default axios we dont have that header
  const authFetch = axios.create({
    baseURL: "/",
    //I can add headers here but this will cause send that token in each axios request
  });

  //request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${reducerState.token}`;
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
      //unauthorized
      console.log(error);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

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
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const getMyStories = async () => {
    try {
      const { data } = await authFetch.get("/myStories");
      const { myStories } = data;
      console.log(myStories);
      dispatch({
        type: GET_MY_STORIES_SUCCESS,
        payload: {
          myStories,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createStory = async (title) => {
    dispatch({ type: CREATE_STORY_BEGIN });
    try {
      await authFetch.post("/myStories", {
        title,
      });
      dispatch({ type: CREATE_STORY_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_STORY_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        reducerState,
        registerUser,
        loginUser,
        logoutUser,
        initialState,
        getMyStories,
        createStory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
