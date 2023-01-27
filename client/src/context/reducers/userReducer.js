import {
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  GET_MY_STORIES_SUCCESS,
  LOGOUT_USER,
  CREATE_STORY_BEGIN,
  CREATE_STORY_SUCCESS,
  CREATE_STORY_ERROR,
  GET_MY_CHAPTERS_SUCCESS,
  SET_EDIT_STORY,
  EDIT_MY_CHAPTER_SUCCESS,
  EDIT_STORY_SUCCESS,
  SAVE_STORY_SUCCESS,
  ADD_STORY_SUCCESS,
  GET_USER_SUCCESS,
} from "../actions";

const userReducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null,
    };
  }
};

export default userReducer;
