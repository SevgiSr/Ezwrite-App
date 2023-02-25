import {
  ADD_CONV_COMMENT_SUCCESS,
  ADD_PROFILE_CONV_SUCCESS,
  CLOSE_EDIT_MODE,
  DELETE_NOTIFICATIONS_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  FOLLOW_PROFILE_BEGIN,
  FOLLOW_PROFILE_SUCCESS,
  GET_IMAGE_SUCCESS,
  GET_PROFILE_CONV_SUCCESS,
  GET_USER_SUCCESS,
  OPEN_EDIT_MODE,
  OPEN_MESSAGES_SUCCESS,
  OPEN_NOTIFICATIONS_SUCCESS,
  UNFOLLOW_PROFILE_BEGIN,
  UNFOLLOW_PROFILE_SUCCESS,
} from "../actions";

const profileReducer = (state, action) => {
  if (action.type === GET_USER_SUCCESS) {
    return {
      ...state,
      profile: action.payload.profile,
      stories: action.payload.stories,
      isMainUser: action.payload.isMainUser,
      isFollowing: action.payload.isFollowing,
    };
  }

  if (action.type === GET_IMAGE_SUCCESS) {
    return {
      ...state,
      profilePicture: action.payload.profilePicture,
    };
  }

  if (action.type === FOLLOW_PROFILE_BEGIN) {
    return {
      ...state,
      isDisabled: true,
    };
  }
  if (action.type === UNFOLLOW_PROFILE_BEGIN) {
    return {
      ...state,
      isDisabled: true,
    };
  }
  if (action.type === FOLLOW_PROFILE_SUCCESS) {
    const newFollowers = [...action.payload.followers];
    const profile = { ...state.profile };
    profile.followers = [...newFollowers];
    return {
      ...state,
      profile: profile,
      isFollowing: true,
      isDisabled: false,
    };
  }
  if (action.type === UNFOLLOW_PROFILE_SUCCESS) {
    const newFollowers = [...action.payload.followers];
    const profile = { ...state.profile };
    profile.followers = [...newFollowers];
    return {
      ...state,
      profile: profile,
      isFollowing: false,
      isDisabled: false,
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
  if (action.type === DELETE_NOTIFICATIONS_SUCCESS) {
    return {
      ...state,
      notifications: [],
    };
  }
};

export default profileReducer;
