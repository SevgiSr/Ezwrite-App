import {
  ADD_CONV_COMMENT_SUCCESS,
  ADD_PROFILE_CONV_SUCCESS,
  CLOSE_EDIT_MODE,
  EDIT_PROFILE_SUCCESS,
  GET_PROFILE_CONV_SUCCESS,
  GET_USER_SUCCESS,
  OPEN_EDIT_MODE,
  OPEN_MESSAGES_SUCCESS,
  OPEN_NOTIFICATIONS_SUCCESS,
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
      convs: action.payload.convs,
    };
  }
  if (action.type === ADD_PROFILE_CONV_SUCCESS) {
    return {
      ...state,
      convs: [...state.convs, action.payload.newConv],
    };
  }
  if (action.type === ADD_CONV_COMMENT_SUCCESS) {
    //conversation with new subcomments
    const newConv = action.payload.newConv;
    const index = state.convs.findIndex((c) => c._id === newConv._id);
    const newConvs = [...state.convs];
    newConvs[index] = newConv;

    return {
      ...state,
      convs: newConvs,
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
  if (action.type === OPEN_MESSAGES_SUCCESS) {
    return {
      ...state,
      messages: action.payload.messages,
    };
  }
  if (action.type === OPEN_NOTIFICATIONS_SUCCESS) {
    return {
      ...state,
      notifications: action.payload.notifications,
    };
  }
};

export default profileReducer;
