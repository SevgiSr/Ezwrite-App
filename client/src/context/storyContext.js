import React, { useReducer, useContext } from "react";
import storyReducer from "./reducers/storyReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";

import {
  ADD_CHAPTER_CONV_SUCCESS,
  ADD_CONV_COMMENT_SUCCESS,
  BEGIN,
  ERROR,
  GET_CHAPTER_SUCCESS,
  GET_STORIES_SUCCESS,
  GET_STORY_SUCCESS,
  SUCCESS,
  UNVOTE_CHAPTER_SUCCESS,
  VOTE_CHAPTER_SUCCESS,
} from "./actions";
import { UserContext } from "./userContext";

const initialState = {
  users: [],
  stories: [],
  story: {},
  chapter: {},
  author: {},
  votes: {},
  myVote: {},
  chapterConvs: [],
};

export const StoryContext = React.createContext();

export const StoryProvider = ({ children }) => {
  const { authFetch } = useContext(UserContext);
  const [state, dispatch] = useReducer(storyReducer, initialState);
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    initialAlertState
  );

  const getByCategory = async (category) => {
    try {
      const { data } = await authFetch.get(`/stories/${category}`);
      const { stories } = data;
      dispatch({ type: GET_STORIES_SUCCESS, payload: { stories } });
    } catch (error) {
      console.log(error);
    }
  };

  const getByQuery = async (query) => {
    try {
      const { data } = await authFetch.get(`/stories/search/${query}`);
      const { stories, users } = data;
      dispatch({ type: GET_STORIES_SUCCESS, payload: { stories, users } });
    } catch (error) {
      console.log(error);
    }
  };

  const getStory = async (id) => {
    try {
      const { data } = await authFetch.get(`/stories/story/${id}`);
      const { story } = data;
      dispatch({ type: GET_STORY_SUCCESS, payload: { story } });
    } catch (error) {
      console.log(error);
    }
  };

  const getChapter = async (story_id, chapter_id) => {
    try {
      const { data } = await authFetch.get(
        `/stories/story/${story_id}/${chapter_id}`
      );
      const { chapter, story, votes, myVote, author, chapterConvs } = data;

      dispatch({
        type: GET_CHAPTER_SUCCESS,
        payload: { chapter, story, votes, myVote, author, chapterConvs },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addChapterConv = async (chapter_id, comment_content) => {
    try {
      const { data } = await authFetch.post(`/stories/chapter/${chapter_id}`, {
        comment_content,
      });
      const { newConv } = data;
      dispatch({ type: ADD_CHAPTER_CONV_SUCCESS, payload: { newConv } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  //you need to call dispatch before making backend request to change UI faster
  const voteChapter = async (chapter_id, vote_value) => {
    alertDispatch({ type: BEGIN });
    try {
      dispatch({ type: VOTE_CHAPTER_SUCCESS, payload: { vote_value } });
      const { data } = await authFetch.patch(`/stories/chapter/${chapter_id}`, {
        vote_value,
      });

      alertDispatch({ type: SUCCESS, payload: { msg: "voted!" } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
      alertDispatch({ type: ERROR });
    }
  };

  const unvoteChapter = async (chapter_id, vote_value) => {
    alertDispatch({ type: BEGIN });
    try {
      dispatch({ type: UNVOTE_CHAPTER_SUCCESS, payload: { vote_value } });
      const { data } = await authFetch.delete(`/stories/chapter/${chapter_id}`);

      alertDispatch({ type: SUCCESS, payload: { msg: "unvoted!" } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
      alertDispatch({ type: ERROR });
    }
  };

  const incrementViewCount = async (chapter_id) => {
    try {
      const { data } = await authFetch.post(
        `/stories/chapter/${chapter_id}/view`
      );
    } catch (error) {
      console.log(error);
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

  return (
    <StoryContext.Provider
      value={{
        state,
        alertState,
        getByCategory,
        getByQuery,
        getStory,
        getChapter,
        addChapterConv,
        voteChapter,
        unvoteChapter,
        addConvComment,
        incrementViewCount,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};
