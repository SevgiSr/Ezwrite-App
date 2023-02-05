import React, { useReducer, useContext } from "react";
import storyReducer from "./reducers/storyReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";

import {
  GET_CHAPTER_SUCCESS,
  GET_STORIES_SUCCESS,
  GET_STORY_SUCCESS,
} from "./actions";
import { UserContext } from "./userContext";

const initialState = {
  stories: [],
  story: {},
  chapter: {},
  author: {},
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
      const { stories } = data;
      dispatch({ type: GET_STORIES_SUCCESS, payload: { stories } });
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
      const { chapter, author } = data;
      dispatch({ type: GET_CHAPTER_SUCCESS, payload: { chapter, author } });
    } catch (error) {
      console.log(error);
    }
  };

  const addChapterConv = async (chapter_id, comment_content) => {
    try {
      await authFetch.post(`/stories/chapter/${chapter_id}`, {
        comment_content,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  return (
    <StoryContext.Provider
      value={{
        state,
        getByCategory,
        getByQuery,
        getStory,
        getChapter,
        addChapterConv,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};
