import {
  ADD_PROFILE_CONV_SUCCESS,
  GET_PROFILE_CONV_SUCCESS,
  GET_USER_SUCCESS,
} from "../actions";

const profileReducer = (state, action) => {
  if (action.type === GET_USER_SUCCESS) {
    return {
      ...state,
      profile: action.payload.profile,
      stories: action.payload.stories,
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
};

export default profileReducer;
