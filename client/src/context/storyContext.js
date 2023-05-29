import React, { useReducer, useContext } from "react";
import storyReducer from "./reducers/storyReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";

import {
  ADD_CHAPTER_CONV_SUCCESS,
  ADD_CONV_COMMENT_SUCCESS,
  ADD_PARAGRAPH_CONV_SUCCESS,
  BEGIN,
  ERROR,
  GET_ALL_STORIES_SUCCESS,
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
  paragraphConv: [],
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

  const getAll = async () => {
    try {
      const { data } = await authFetch.get(`/stories/search/all`);
      const { stories } = data;
      dispatch({ type: GET_ALL_STORIES_SUCCESS, payload: { stories } });
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

  /*   const getChapter = async (story_id, chapter_id) => {
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
  }; */

  const setChapter = (chapter, story) => {
    dispatch({ type: GET_CHAPTER_SUCCESS, payload: { chapter, story } });
  };

  const getProgress = async (story_id) => {
    try {
      const { data } = await authFetch.get(`/stories/progress/${story_id}`);
      const { progress } = data;
      return progress;
    } catch (error) {
      console.log(error);
    }
  };

  const setProgress = async (story_id, chapter_id) => {
    try {
      const { data } = await authFetch.post(
        `/stories/progress/${story_id}/${chapter_id}`
      );
      const { progress } = data;
      return progress;
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

  const addParagraphConv = async (paragraph_id, comment_content) => {
    try {
      const { data } = await authFetch.post(
        `/stories/chapter/comments/${paragraph_id}`,
        {
          comment_content,
        }
      );
      const { updatedParagraph, newConvs } = data;
      dispatch({
        type: ADD_PARAGRAPH_CONV_SUCCESS,
        payload: { updatedParagraph, newConvs },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };
  const addStoryConv = async (story_id, comment_content) => {
    try {
      const { data } = await authFetch.post(`/stories/story/${story_id}`, {
        comment_content,
      });
      const { newConv } = data;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  //you need to call dispatch before making backend request to change UI faster
  const voteChapter = async (chapter_id, vote_value) => {
    alertDispatch({ type: BEGIN });
    try {
      //will dispatch first so that it updates UI immediately
      dispatch({ type: VOTE_CHAPTER_SUCCESS, payload: { vote_value } });
      //backend request
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

  const addConvComment = async (conv_id, comment_content, updatedParagraph) => {
    try {
      const { data } = await authFetch.post(`/conversations/${conv_id}`, {
        comment_content,
      });
      const { newConv } = data;
      if (!updatedParagraph) {
        dispatch({
          type: ADD_CONV_COMMENT_SUCCESS,
          payload: { newConv, type: "chapter" },
        });
      } else {
        dispatch({
          type: ADD_CONV_COMMENT_SUCCESS,
          payload: {
            newConv,
            type: "paragraph",
            updatedParagraph,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToReadingList = async (readingListId, story_id) => {
    try {
      const { data } = await authFetch.patch(
        `/stories/readingLists/${readingListId}`,
        {
          story_id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createReadingList = async (title, story_id) => {
    try {
      const { data } = await authFetch.post(`/stories/readingLists`, {
        title,
        story_id,
      });
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
        setChapter,
        addChapterConv,
        addParagraphConv,
        voteChapter,
        unvoteChapter,
        addConvComment,
        incrementViewCount,
        getAll,
        getProgress,
        setProgress,
        createReadingList,
        addToReadingList,
        addStoryConv,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};
