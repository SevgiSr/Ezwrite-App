import React, { useContext, useReducer } from "react";
import axios from "axios";
import profileReducer from "./reducers/profileReducer";
import {
  ADD_PROFILE_CONV_SUCCESS,
  CLOSE_EDIT_MODE,
  EDIT_PROFILE_SUCCESS,
  GET_PROFILE_CONV_SUCCESS,
  GET_USER_SUCCESS,
  OPEN_EDIT_MODE,
} from "./actions";
import { UserContext } from "./userContext";

export const initialProfileState = {
  profile: {},
  stories: [],
  conv: [],

  //edit
  isEditMode: false,
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
      const { user } = data;
      dispatch({
        type: GET_USER_SUCCESS,
        payload: { profile: user, stories: user.stories },
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const getProfileConv = async (username) => {
    try {
      const { data } = await authFetch.get(`/user/${username}/conversations`);
      const { conv } = data;
      dispatch({ type: GET_PROFILE_CONV_SUCCESS, payload: { conv } });
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

  const addConvComment = async (conv_id, comment_content) => {
    try {
      await authFetch.post(`/user/${conv_id}`, {
        comment_content,
      });
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
  return (
    <ProfileContext.Provider
      value={{
        profileState,
        getProfile,
        getProfileConv,
        addProfileConv,
        addConvComment,
        openEditMode,
        closeEditMode,
        editProfileInfo,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
