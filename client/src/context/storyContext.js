import React, { useReducer, useContext } from "react";
import storyReducer from "./reducers/storyReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";
import axios from "axios";

import {
  BEGIN,
  ERROR,
  GET_CHAPTER_SUCCESS,
  GET_STORIES_SUCCESS,
  SUCCESS,
  UNVOTE_CHAPTER_SUCCESS,
  VOTE_CHAPTER_SUCCESS,
} from "./actions";
import { UserContext } from "./userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
      const { stories, users } = data;
      return { stories, users };
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

  /* //////// CANCEL TOKEN ///////////// */
  /* QUEUE REQUESTS, ENSURE THAT ONLY ONE MUTATION IS IN PROGRESS AT ANY TIME */

  /* 
  FIXED: 
    1."No matching document found for id" from backend
    2."undefined" chapter from frontend
  
  BEFORE: When you click on uncached chapters very quick and make multiple mutation requests,
  race conditions were occurring.
   -> A race condition in this context is when your code's behavior is dependent on the relative timing of events, 
   such as multiple network requests. If these events don't occur in the order you expect, it can lead to unexpected behavior and errors.

Before, your mutation was running multiple requests at the same time without any form of synchronization. 
These multiple requests were modifying the same resource (a chapter in this case) in the database concurrently, 
leading to the "No matching document found for id" error due to versioning. 
This happens when one mutation request finishes and updates the version of the document while another mutation request is still running on the old version of the document.
  
Even though you might not be seeing the cancel logs, it doesn't necessarily mean that the cancel mechanism isn't working. The mechanism is more about ensuring that there's only one mutation in progress at any time rather than actually cancelling a lot of requests. The absence of the log message could simply mean that most of your requests have a chance to complete before a new mutation is initiated.

Given that the backend seems to handle only one request at a time (as evidenced by the versioning error you mentioned), this setup of canceling the previous request when a new one comes in should help to prevent errors and make the app more robust.
  
  */
  let source = axios.CancelToken.source();

  const setProgress = async (story_id, chapter_id) => {
    try {
      const { data } = await authFetch.post(
        `/stories/progress/${story_id}/${chapter_id}`,
        {
          cancelToken: source.token,
        }
      );
      const { progress } = data;
      return progress;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log(error);
      }
    }
  };

  const addStoryConv = async (story_id, comment_content) => {
    try {
      const { data } = await authFetch.post(`/stories/story/${story_id}`, {
        comment_content,
      });
      const { newConv } = data;
      return newConv;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const deleteStoryConv = async (story_id, conv_id) => {
    try {
      await authFetch.delete(`/stories/story/${story_id}/${conv_id}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addChapterConv = async (chapter_id, comment_content) => {
    try {
      const { data } = await authFetch.post(`/stories/chapter/${chapter_id}`, {
        comment_content,
      });
      const { newConv } = data;
      return newConv;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const deleteChapterConv = async (chapter_id, conv_id) => {
    try {
      await authFetch.delete(`/stories/chapter/${chapter_id}/${conv_id}`);
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
      const { comment } = data;
      return comment;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const deleteParagraphConv = async (paragraph_id, conv_id) => {
    try {
      await authFetch.delete(
        `/stories/chapter/comments/${paragraph_id}/${conv_id}`
      );
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  //you need to call dispatch before making backend request to change UI faster
  const voteChapter = async (story_id, chapter_id, vote_value) => {
    alertDispatch({ type: BEGIN });
    try {
      //will dispatch first so that it updates UI immediately
      dispatch({ type: VOTE_CHAPTER_SUCCESS, payload: { vote_value } });
      //backend request
      const { data } = await authFetch.patch(
        `/stories/vote/${story_id}/${chapter_id}`,
        {
          vote_value,
        }
      );
      alertDispatch({ type: SUCCESS, payload: { msg: "voted!" } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
      alertDispatch({ type: ERROR });
    }
  };

  const unvoteChapter = async (story_id, chapter_id, vote_value) => {
    alertDispatch({ type: BEGIN });
    try {
      dispatch({ type: UNVOTE_CHAPTER_SUCCESS, payload: { vote_value } });
      const { data } = await authFetch.delete(
        `/stories/vote/${story_id}/${chapter_id}`
      );

      alertDispatch({ type: SUCCESS, payload: { msg: "unvoted!" } });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
      alertDispatch({ type: ERROR });
    }
  };

  const incrementViewCount = async (story_id, chapter_id) => {
    try {
      const { data } = await authFetch.post(
        `/stories/view/${story_id}/${chapter_id}`
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

      return newConv;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteConvComment = async (conv_id, comment_id) => {
    try {
      await authFetch.delete(`/conversations/${conv_id}/${comment_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getLibrary = async () => {
    try {
      const { data } = await authFetch.get("/stories/library");
      const { continueReading, readingLists } = data;
      return { continueReading, readingLists };
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
      const { readingList } = data;
      return readingList;
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
      const { readingList } = data;
      return readingList;
    } catch (error) {
      console.log(error);
    }
  };

  /* PROGRESS MUTATIONS */

  const useSetProgress = () => {
    return useMutation(
      ({ story_id, chapter_id }) => {
        // Cancel previous request if it exists
        if (source) {
          source.cancel("Operation canceled due to new request.");
        }

        // Create a new cancel token for this request
        source = axios.CancelToken.source();
        return setProgress(story_id, chapter_id);
      },
      {
        onSuccess: (data, variables) => {
          const currentChapter = data.chapters.find(
            (chapter) => chapter._id === variables.chapter_id
          );
          const newCache = data.chapters.map((chapter) => chapter.title);
          console.log(newCache);
          setChapter(currentChapter, data.story);
          queryClient.setQueryData(["progress", variables.story_id], data);
        },
      }
    );
  };

  /* COMMENT MUTATIONS */

  const queryClient = useQueryClient();

  const useAddStoryConv = () => {
    return useMutation((data) => addStoryConv(data.dest, data.comment), {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
      },
    });
  };

  const useDeleteStoryConv = () => {
    return useMutation((data) => deleteStoryConv(data.dest, data.conv_id), {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
      },
    });
  };

  const useAddChapterConv = () => {
    return useMutation((data) => addChapterConv(data.dest, data.comment), {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
      },
    });
  };

  const useDeleteChapterConv = () => {
    return useMutation((data) => deleteChapterConv(data.dest, data.conv_id), {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
      },
    });
  };

  const useAddParagraphConv = () => {
    return useMutation((data) => addParagraphConv(data.dest, data.comment), {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
      },
    });
  };

  const useDeleteParagraphConv = () => {
    return useMutation((data) => deleteParagraphConv(data.dest, data.conv_id), {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
      },
    });
  };

  const useAddConvComment = () => {
    return useMutation((data) => addConvComment(data.dest, data.comment), {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
      },
    });
  };

  const useDeleteConvComment = () => {
    return useMutation(
      (data) => deleteConvComment(data.conv_id, data.comment_id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["progress"]);
        },
      }
    );
  };

  /* LIST MUTATIONS */

  const useCreateList = () => {
    return useMutation((data) => createReadingList(data.title, data.story_id), {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
        queryClient.invalidateQueries(["library"]);
      },
    });
  };

  const useAddToList = () => {
    return useMutation(
      (data) => addToReadingList(data.readingListId, data.story_id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["progress"]);
          queryClient.invalidateQueries(["library"]);
        },
      }
    );
  };

  return (
    <StoryContext.Provider
      value={{
        state,
        alertState,
        getByCategory,
        getByQuery,
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
        getLibrary,
        createReadingList,
        addToReadingList,
        addStoryConv,

        useSetProgress,
        useAddChapterConv,
        useAddStoryConv,
        useAddParagraphConv,
        useAddConvComment,
        useCreateList,
        useAddToList,
        useDeleteConvComment,
        useDeleteChapterConv,
        useDeleteStoryConv,
        useDeleteParagraphConv,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

/* 
REMOVED DISPATCH

*/
