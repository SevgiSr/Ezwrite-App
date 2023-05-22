import React, { useReducer, useContext } from "react";
import myStoryReducer from "./reducers/myStoryReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";

import {
  BEGIN,
  CREATE_STORY_BEGIN,
  CREATE_STORY_ERROR,
  CREATE_STORY_SUCCESS,
  EDIT_MY_CHAPTER_SUCCESS,
  EDIT_STORY_SUCCESS,
  ERROR,
  GET_MY_CHAPTERS_SUCCESS,
  GET_MY_STORIES_SUCCESS,
  GET_MY_STORY_SUCCESS,
  SEND_GPT_PROMPT,
  SET_EDIT_STORY,
  SUCCESS,
} from "./actions";

import { UserContext } from "./userContext";

const initialStoryState = {
  //all stories
  myStories: [],

  myStory: {},

  //chapters
  story: {},
  chapters: [],

  //chapter
  chapter: {},

  gptResponse: "",
};

export const MyStoryContext = React.createContext();

export const MyStoryProvider = ({ children }) => {
  const [storyState, dispatch] = useReducer(myStoryReducer, initialStoryState);
  const [alertState, alertDispatch] = useReducer(
    alertReducer,
    initialAlertState
  );

  const { authFetch } = useContext(UserContext);

  const getMyStories = async () => {
    try {
      const { data } = await authFetch.get("/myStories");
      const { myStories } = data;
      dispatch({
        type: GET_MY_STORIES_SUCCESS,
        payload: {
          myStories,
        },
      });
      return myStories;
    } catch (error) {
      console.log(error);
    }
  };

  const setMyStory = async (myStory) => {
    try {
      dispatch({
        type: GET_MY_STORY_SUCCESS,
        payload: {
          myStory,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createStory = async (file, storyDetails) => {
    alertDispatch({ type: BEGIN });
    try {
      let fileData = new FormData();
      fileData.append("file", file);
      const { data } = await authFetch.post("/myStories", storyDetails);
      const { story } = data;
      const { data1 } = await authFetch.post(
        `/myStories/cover/${story._id}`,
        fileData
      );
      alertDispatch({ type: SUCCESS, payload: { msg: "New Story Created!" } });
    } catch (error) {
      if (error.response.status === 401) return;
      alertDispatch({
        type: ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deleteStory = async (story_id) => {
    try {
      await authFetch.delete(`/myStories/delete/${story_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStory = async (story_id, storyDetails) => {
    alertDispatch({ type: BEGIN });
    try {
      const { data } = await authFetch.patch(
        `/myStories/update/${story_id}`,
        storyDetails
      );
      const { story } = data;
      alertDispatch({ type: SUCCESS, payload: { msg: "Updated Story!" } });
    } catch (error) {
      if (error.response.status === 401) return;
      alertDispatch({
        type: ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const updateCover = async (file, story_id) => {
    alertDispatch({ type: BEGIN });
    try {
      let fileData = new FormData();
      fileData.append("file", file);
      const { data } = await authFetch.post(
        `/myStories/cover/${story_id}`,
        fileData
      );
      alertDispatch({ type: SUCCESS, payload: { msg: "updated cover!" } });
    } catch (error) {
      console.log(error);
      alertDispatch({ type: ERROR });
    }
  };

  const setEditStory = async (id) => {
    dispatch({ type: SET_EDIT_STORY, payload: { id } });
  };

  const getMyChapters = async (id) => {
    try {
      setEditStory(id);
      const { data } = await authFetch.get(`/myStories/${id}`);
      const { story } = data;
      dispatch({
        type: GET_MY_CHAPTERS_SUCCESS,
        payload: { story: story, chapters: story.chapters },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const setEditChapter = async (story, chapter) => {
    try {
      dispatch({
        type: EDIT_MY_CHAPTER_SUCCESS,
        payload: { story, chapter },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const saveChapter = async (chapter, divArray, story_id, chapter_id) => {
    try {
      await authFetch.patch(`/myStories/${story_id}/${chapter_id}`, {
        chapter,
        divArray,
      });
      dispatch({ type: EDIT_STORY_SUCCESS, payload: { chapter } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addChapter = async (story_id) => {
    try {
      const { data } = await authFetch.post(`/myStories/${story_id}`);
      const { newStory, chapter } = data;
      return chapter._id;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const sendGptPrompt = async (prompt) => {
    try {
      const { data } = await authFetch.post(`/myStories/gpt`, {
        prompt,
      });
      const { GPTresponse } = data;
      dispatch({ type: SEND_GPT_PROMPT, payload: { GPTresponse } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  return (
    <MyStoryContext.Provider
      value={{
        storyState,
        alertState,
        getMyStories,
        setMyStory,
        createStory,
        deleteStory,
        updateCover,
        getMyChapters,
        setEditStory,
        setEditChapter,
        saveChapter,
        addChapter,
        updateStory,
        sendGptPrompt,
      }}
    >
      {children}
    </MyStoryContext.Provider>
  );
};
