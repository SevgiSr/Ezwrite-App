import {
  ADD_PROFILE_CONV_SUCCESS,
  CLOSE_EDIT_MODE,
  EDIT_PROFILE_SUCCESS,
  GET_PROFILE_CONV_SUCCESS,
  GET_USER_SUCCESS,
  OPEN_EDIT_MODE,
} from "../actions";

const profileReducer = (state, action) => {
  if (action.type === GET_USER_SUCCESS) {
    return {
      ...state,
      profile: action.payload.profile,
      stories: action.payload.stories,
      isMainUser: action.payload.isMainUser,
    };
  }
  if (action.type === GET_PROFILE_CONV_SUCCESS) {
    return {
      ...state,
      conv: action.payload.conv,
    };
  }
  if (action.type === ADD_PROFILE_CONV_SUCCESS) {
    return {
      ...state,
      conv: action.payload.conv,
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
  if (action.type === EDIT_PROFILE_SUCCESS) {
    return {
      ...state,
      profile: action.payload.newUser,
    };
  }
};

export default profileReducer;
