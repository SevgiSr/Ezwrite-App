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
} from "./actions";

const reducer = (state, action) => {
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting...",
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting...",
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null,
    };
  }

  if (action.type === GET_MY_STORIES_SUCCESS) {
    return {
      ...state,
      myStories: action.payload.myStories,
    };
  }

  if (action.type === CREATE_STORY_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_STORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Story Created!",
    };
  }

  if (action.type === CREATE_STORY_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_MY_CHAPTERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      story: action.payload.story,
      chapters: action.payload.chapters,
    };
  }

  if (action.type === SET_EDIT_STORY) {
    const story = state.myStories.find(
      (story) => story._id === action.payload.id
    );
    return {
      ...state,
      story,
    };
  }

  if (action.type === EDIT_MY_CHAPTER_SUCCESS) {
    return {
      ...state,
      chapter: action.payload.chapter,
      story: action.payload.story,
    };
  }

  if (action.type === EDIT_STORY_SUCCESS) {
    return {
      ...state,
      chapter: action.payload.chapter,
    };
  }

  if (action.type === GET_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
};

export default reducer;
