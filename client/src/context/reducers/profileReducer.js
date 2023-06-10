import {
  CLOSE_EDIT_MODE,
  GET_IMAGE_SUCCESS,
  GET_PROFILE_SETTINGS,
  OPEN_EDIT_MODE,
  OPEN_MESSAGES_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
} from "../actions";

const profileReducer = (state, action) => {
  if (action.type === GET_IMAGE_SUCCESS) {
    return {
      ...state,
      profilePicture: action.payload.profilePicture,
    };
  }

  if (action.type === OPEN_EDIT_MODE) {
    return {
      ...state,
      isEditMode: true,
    };
  }
  if (action.type === CLOSE_EDIT_MODE) {
    return {
      ...state,
      isEditMode: false,
    };
  }
  if (action.type === GET_PROFILE_SETTINGS) {
    return {
      ...state,
      profileSettings: { ...action.payload.profileSettings },
    };
  }

  if (action.type === OPEN_MESSAGES_SUCCESS) {
    return {
      ...state,
      messages: action.payload.messages,
    };
  }
  if (action.type === UPLOAD_IMAGE_SUCCESS) {
    return {
      ...state,
      profilePicture: action.payload.profilePicture,
    };
  }
};

export default profileReducer;
