import React, { useContext, useReducer } from "react";
import axios from "axios";
import profileReducer from "./reducers/profileReducer";
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
  SEND_NOTIFICATION_SUCCESS,
  UNFOLLOW_PROFILE_BEGIN,
  UNFOLLOW_PROFILE_SUCCESS,
} from "./actions";
import { UserContext } from "./userContext";

export const initialProfileState = {
  isMainUser: false,
  isFollowing: false,
  isDisabled: false,
  profile: {},
  stories: [],
  convs: [],
  conv: {},
  //edit
  isEditMode: false,

  //messaging
  messages: [],

  //notification
  notifications: [],
};

export const ProfileContext = React.createContext();

export const ProfileProvider = ({ children }) => {
  const [profileState, dispatch] = useReducer(
    profileReducer,
    initialProfileState
  );

  const { authFetch } = useContext(UserContext);

  const getProfile = async (username) => {
    try {
      const { data } = await authFetch.get(`/user/${username}`);
      const { user, isMainUser, isFollowing } = data;
      dispatch({
        type: GET_USER_SUCCESS,
        payload: {
          profile: user,
          stories: user.stories,
          isMainUser: isMainUser,
          isFollowing: isFollowing,
        },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const uploadImage = async (file) => {
    try {
      let fileData = new FormData();
      fileData.append("file", file);
      const { data } = await authFetch.post("/upload/profilePicture", fileData);
    } catch (error) {
      console.log(error);
    }
  };

  const displayImage = async (filename) => {
    /*     try {
      console.log(filename);
      const { data } = await authFetch.get(`/images/${filename}`);
      const { file } = data;
      dispatch({ type: GET_IMAGE_SUCCESS, payload: { profilePicture: file } });
    } catch (error) {
      console.log(error);
    } */
  };

  const followProfile = async (username) => {
    try {
      dispatch({
        type: FOLLOW_PROFILE_BEGIN,
      });
      const { data } = await authFetch.get(`/user/${username}/follow`);
      const { followers } = data;
      dispatch({
        type: FOLLOW_PROFILE_SUCCESS,
        payload: { followers },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowProfile = async (username) => {
    try {
      dispatch({
        type: UNFOLLOW_PROFILE_BEGIN,
      });
      const { data } = await authFetch.get(`/user/${username}/unfollow`);

      const { followers } = data;
      dispatch({
        type: UNFOLLOW_PROFILE_SUCCESS,
        payload: { followers },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileConv = async (username) => {
    try {
      const { data } = await authFetch.get(`/user/${username}/conversations`);
      const { convs } = data;
      dispatch({ type: GET_PROFILE_CONV_SUCCESS, payload: { convs } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addProfileConv = async (profile_name, comment_content) => {
    try {
      const { data } = await authFetch.post(
        `/user/${profile_name}/conversations`,
        {
          comment_content,
        }
      );
      const { newConv } = data;
      dispatch({ type: ADD_PROFILE_CONV_SUCCESS, payload: { newConv } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addConvComment = async (conv_id, comment_content) => {
    try {
      const { data } = await authFetch.post(`/conversations/${conv_id}`, {
        comment_content,
      });
      const { newConv } = data;
      dispatch({ type: ADD_CONV_COMMENT_SUCCESS, payload: { newConv } });
    } catch (error) {
      console.log(error);
    }
  };

  const openEditMode = () => {
    dispatch({ type: OPEN_EDIT_MODE });
  };

  const closeEditMode = () => {
    dispatch({ type: CLOSE_EDIT_MODE });
  };

  const editProfileInfo = async (profileInfo) => {
    try {
      console.log(profileInfo);
      const { data } = await authFetch.patch(
        `/user/${profileState.profile.name}`,
        { profileInfo }
      );
      const { newUser } = data;
      dispatch({ type: EDIT_PROFILE_SUCCESS, payload: { newUser } });
    } catch (error) {
      console.log(error);
    }
  };

  const getInbox = async () => {};

  const openMessages = async (username) => {
    try {
      const { data } = await authFetch.get(`/messages/${username}`);
      const { conv } = data;
      dispatch({
        type: OPEN_MESSAGES_SUCCESS,
        payload: { messages: conv.messages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (username, message_content) => {
    try {
      await authFetch.post(`/messages/${username}`, {
        message_content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotification = async (username, notification) => {
    try {
      await authFetch.post(`/messages/notifications/${username}`, {
        nt: notification,
      });
      console.log(notification);
    } catch (error) {
      console.log(error);
    }
  };

  const openNotifications = async () => {
    try {
      const { data } = await authFetch.get(`/messages/notifications`);
      const { notifications } = data;
      console.log(notifications);
      dispatch({
        type: OPEN_NOTIFICATIONS_SUCCESS,
        payload: { notifications },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotifications = async () => {
    try {
      await authFetch.delete(`/messages/notifications`);

      dispatch({
        type: DELETE_NOTIFICATIONS_SUCCESS,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileState,
        getProfile,
        uploadImage,
        displayImage,
        followProfile,
        unfollowProfile,
        getProfileConv,
        addProfileConv,
        addConvComment,
        openEditMode,
        closeEditMode,
        editProfileInfo,
        openMessages,
        sendMessage,
        openNotifications,
        sendNotification,
        deleteNotifications,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
