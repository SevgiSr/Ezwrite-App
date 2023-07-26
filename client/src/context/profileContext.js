import React, { useContext, useReducer } from "react";
import axios from "axios";
import profileReducer from "./reducers/profileReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";

import {
  BEGIN,
  CLOSE_EDIT_MODE,
  ERROR,
  GET_PROFILE_SETTINGS,
  OPEN_EDIT_MODE,
  OPEN_MESSAGES_SUCCESS,
  SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
} from "./actions";
import { UserContext } from "./userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const initialProfileState = {
  isMainUser: false,
  isFollowing: false,
  isDisabled: false,
  profile: {},
  profileSettings: {},
  profilePicture: "",
  stories: [],
  convs: [],
  conv: {},
  activity: [],
  //edit
  isEditMode: false,

  inbox: [],
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
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    initialAlertState
  );

  const { authFetch } = useContext(UserContext);

  const getProfile = async (username) => {
    try {
      const { data } = await authFetch.get(`/user/${username}`);
      const { profile, isMainUser, isFollowing } = data;
      return { profile, isMainUser, isFollowing };
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const uploadImage = async (file) => {
    alertDispatch({ type: BEGIN, payload: { id: "profile" } });
    try {
      let fileData = new FormData();
      fileData.append("file", file);
      const { data } = await authFetch.post("/upload/profilePicture", fileData);
      const { profilePicture } = data;
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: { profilePicture } });
      alertDispatch({
        type: SUCCESS,
        payload: { msg: "successfully updated the profile picture" },
      });
    } catch (error) {
      console.log(error);
      alertDispatch({ type: ERROR });
    }
  };

  const uploadBcImage = async (file) => {
    alertDispatch({ type: BEGIN, payload: { id: "background" } });
    try {
      let fileData = new FormData();
      fileData.append("file", file);
      const { data } = await authFetch.post(
        "/upload/backgroundPicture",
        fileData
      );
      const { backgroundPicture } = data;
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: { backgroundPicture } });
      alertDispatch({
        type: SUCCESS,
        payload: { msg: "successfully updated the profile picture" },
      });
    } catch (error) {
      console.log(error);
      alertDispatch({ type: ERROR });
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

  const getAllUsers = async () => {
    try {
      const { data } = await authFetch.get(`/user/explore/all`);
      const { users } = data;
      console.log(users);
      return users;
    } catch (error) {
      console.log(error);
      alertDispatch({ type: ERROR });
    }
  };

  const followProfile = async (username) => {
    try {
      const { data } = await authFetch.get(`/user/${username}/follow`);
      const { followers } = data;
      return followers;
    } catch (error) {
      console.log(error);
      alertDispatch({ type: ERROR });
    }
  };

  const unfollowProfile = async (username) => {
    try {
      const { data } = await authFetch.get(`/user/${username}/unfollow`);
      const { followers } = data;
      return followers;
    } catch (error) {
      console.log(error);
      alertDispatch({ type: ERROR });
    }
  };

  const getProfileConv = async (username) => {
    try {
      const { data } = await authFetch.get(`/user/${username}/conversations`);
      const { convs } = data;
      return convs;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addProfileConv = async (profile_name, comment_content) => {
    try {
      await authFetch.post(`/user/${profile_name}/conversations`, {
        comment_content,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const deleteProfileConv = async (profile_name, conv_id) => {
    try {
      await authFetch.delete(`/user/${profile_name}/conversations/${conv_id}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addConvComment = async (conv_id, comment_content) => {
    try {
      await authFetch.post(`/conversations/${conv_id}`, {
        comment_content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteConvComment = async (conv_id, comment_id) => {
    try {
      console.log("deleting in");
      await authFetch.delete(`/conversations/${conv_id}/${comment_id}`);
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

  const editProfileInfo = async (profileInfo, username) => {
    try {
      const { data } = await authFetch.patch(`/user/${username}`, {
        profileInfo,
      });
      const { newUser } = data;
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileSettings = async () => {
    try {
      const { data } = await authFetch.get("/user/settings");
      const { profileSettings } = data;
      dispatch({ type: GET_PROFILE_SETTINGS, payload: { profileSettings } });
    } catch (error) {
      console.log(error);
    }
  };

  const getInbox = async () => {
    try {
      const { data } = await authFetch.get("/messages/inbox");
      const { inbox } = data;
      return inbox;
    } catch (error) {
      console.log(error);
    }
  };

  //has dispatch
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
    } catch (error) {
      console.log(error);
    }
  };

  const openNotifications = async () => {
    try {
      const { data } = await authFetch.get(`/messages/notifications`);
      const { notifications } = data;
      return notifications;
    } catch (error) {
      console.log(error);
    }
  };

  /* const deleteNotifications = async () => {
    try {
      await authFetch.delete(`/messages/notifications`);

      dispatch({
        type: DELETE_NOTIFICATIONS_SUCCESS,
      });
    } catch (error) {
      console.log(error);
    }
  }; */

  /* MUTATIONS */

  const queryClient = useQueryClient();

  const useEditProfileInfo = () => {
    return useMutation(
      ({ state, username }) => editProfileInfo(state, username),
      {
        onMutate: (variables) => {
          queryClient.setQueriesData(
            ["profile", variables.username],
            (old) => ({
              ...old,
              profile: { ...old.profile, ...variables.state },
            })
          );
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["profile"]);
        },
      }
    );
  };

  const useAddProfileConv = () => {
    return useMutation(
      (data) => addProfileConv(data.dest, data.comment, data.updatedParagraph),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["conversations"]);
        },
      }
    );
  };

  const useDeleteProfileConv = () => {
    return useMutation((data) => deleteProfileConv(data.dest, data.conv_id), {
      onSuccess: () => {
        queryClient.invalidateQueries(["conversations"]);
      },
    });
  };

  const useAddConvComment = () => {
    return useMutation((data) => addConvComment(data.dest, data.comment), {
      onSuccess: () => {
        queryClient.invalidateQueries(["conversations"]);
      },
    });
  };

  const useDeleteConvComment = () => {
    return useMutation(
      (data) => deleteConvComment(data.conv_id, data.comment_id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["conversations"]);
        },
      }
    );
  };

  const useFollowProfile = () => {
    return useMutation((data) => followProfile(data.username), {
      onMutate: (variables) => {
        queryClient.setQueriesData(["profile", variables.username], (old) => {
          return { ...old, isFollowing: true };
        });
      },
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["profile", variables.username]);
      },
    });
  };

  const useUnfollowProfile = () => {
    return useMutation((data) => unfollowProfile(data.username), {
      onMutate: (variables) => {
        queryClient.setQueriesData(["profile", variables.username], (old) => {
          return { ...old, isFollowing: false };
        });
      },
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["profile", variables.username]);
      },
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profileState,
        alertState,
        getAllUsers,
        getProfile,
        uploadImage,
        uploadBcImage,
        displayImage,
        followProfile,
        unfollowProfile,
        getProfileConv,
        addProfileConv,
        addConvComment,
        openEditMode,
        closeEditMode,
        editProfileInfo,
        getProfileSettings,
        getInbox,
        openMessages,
        sendMessage,
        openNotifications,
        sendNotification,

        useAddProfileConv,
        useAddConvComment,
        useFollowProfile,
        useUnfollowProfile,
        useEditProfileInfo,
        useDeleteConvComment,
        useDeleteProfileConv,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

/* 

REMOVED DISPATCHES

*/
