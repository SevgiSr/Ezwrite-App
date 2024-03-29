import React, { useReducer, useContext } from "react";
import myStoryReducer from "./reducers/myStoryReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";
import axios from "axios";

import {
  BEGIN,
  CLEAR_ALERT,
  EDIT_MY_CHAPTER_SUCCESS,
  ERROR,
  GET_MY_STORY_SUCCESS,
  MUTATION_BEGIN,
  MUTATION_SUCCESS,
  SET_EDIT_STORY,
  SUCCESS,
} from "./actions";

import { UserContext } from "./userContext";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const initialStoryState = {
  //all stories
  myStories: [],

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

  const clearAlert = () => {
    setTimeout(() => {
      alertDispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const { authFetch } = useContext(UserContext);

  const showErrorAlert = (message) => {
    alertDispatch({ type: ERROR, payload: { msg: message } });
    clearAlert();
  };

  const getMyStories = async () => {
    try {
      const { data } = await authFetch.get("/myStories");
      const { myStories } = data;
      return myStories;
    } catch (error) {
      console.log(error);
    }
  };

  const setMyStory = async (story) => {
    try {
      dispatch({
        type: GET_MY_STORY_SUCCESS,
        payload: {
          story,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTags = async (prefix) => {
    try {
      console.log(prefix);
      const { data } = await authFetch.get("/myStories/suggestions", {
        params: { prefix },
      });
      const { tagCounts } = data;
      console.log(tagCounts);
      return tagCounts;
    } catch (error) {
      console.log(error);
    }
  };

  const createStory = async (file, storyDetails) => {
    try {
      let fileData = new FormData();
      fileData.append("file", file);
      const { data } = await authFetch.post("/myStories", storyDetails);
      const { story } = data;
      const { data1 } = await authFetch.post(
        `/myStories/cover/${story._id}`,
        fileData
      );
    } catch (error) {
      throw error;
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
    try {
      console.log("bruh");
      const { data } = await authFetch.post(
        `/myStories/update/${story_id}`,
        storyDetails
      );
      console.log("duh");
      const { story } = data;
    } catch (error) {
      console.log(error);
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

  const setEditChapter = async (story, chapters, chapter) => {
    try {
      dispatch({
        type: EDIT_MY_CHAPTER_SUCCESS,
        payload: { story, chapters, chapter },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const saveChapter = async (
    title,
    paragraphContents,
    story_id,
    chapter_id
  ) => {
    try {
      await authFetch.patch(
        `/myStories/stories/${story_id}/chapters/${chapter_id}`,
        {
          title,
          paragraphContents,
        }
      );
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const restoreChapterHistory = async (story_id, chapter_id, history_id) => {
    try {
      await authFetch.patch(`/myStories/history/${story_id}/${chapter_id}`, {
        history_id,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addChapter = async (id) => {
    try {
      const { data } = await authFetch.patch(`/myStories/stories/${id}`);
      const { chapter_id, story_id } = data;
      console.log(chapter_id, story_id);
      return { chapter_id, story_id };
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const deleteChapter = async (story_id, chapter_id) => {
    try {
      await authFetch.delete(
        `/myStories/stories/${story_id}/chapters/${chapter_id}`
      );
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const publishChapter = async (story_id, chapter_id) => {
    try {
      await authFetch.patch(`/myStories/publish/${story_id}/${chapter_id}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const unpublishChapter = async (story_id, chapter_id) => {
    try {
      await authFetch.patch(`/myStories/unpublish/${story_id}/${chapter_id}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const sendGptPrompt = async (prompt, userId) => {
    try {
      await axios.post(`/api/gpt/prompt`, {
        prompt,
        userId,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const grantCollaboratorAccess = async (story_id, user_id) => {
    try {
      const { data } = await authFetch.patch(
        `/myStories/collaborations/${story_id}/user/${user_id}`
      );
      const { fork } = data;
      return fork;
    } catch (error) {
      console.log(error);
    }
  };

  const mergeFork = async (fork_id) => {
    try {
      await authFetch.patch(`/myStories/collaborations/forks/${fork_id}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const restoreMergeHistory = async (history_id) => {
    try {
      await authFetch.patch(`/myStories/collaborations/history/${history_id}`);
      console.log("made merge history");
    } catch (error) {
      throw error;
    }
  };

  const declineCollaboratorAccess = async (req_id) => {
    try {
      // in mutations, frontend functions doesnt have to return anything. on backend controllers have to return a response
      await authFetch.delete(`/myStories/collaborations/collab/${req_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const declinePullRequest = async (req_id) => {
    try {
      await authFetch.delete(`/myStories/collaborations/pull/${req_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  /* MUTATIONS */

  const queryClient = useQueryClient();

  const useCreateStory = () => {
    return useMutation((data) => createStory(data.cover, data.storyDetails), {
      onMutate: () => {
        alertDispatch({ type: BEGIN });
      },
      onSuccess: () => {
        alertDispatch({
          type: SUCCESS,
        });
        queryClient.invalidateQueries(["myStories"]);
      },
      onError: (error) => {
        alertDispatch({
          type: ERROR,
          payload: { msg: error.message },
        });
        clearAlert();
      },
    });
  };

  const useDeleteStory = () => {
    return useMutation((data) => deleteStory(data.story_id), {
      onMutate: (variables) => {
        const data = queryClient.getQueryData(["myStories"]);
        const data_filtered = data.filter(
          (story) => story._id !== variables.story_id
        );
        console.log(data_filtered);
        queryClient.setQueryData(["myStories"], () => data_filtered);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["myStories"]);
      },
    });
  };

  const useSaveChapter = () => {
    return useMutation(
      (data) =>
        saveChapter(
          data.title,
          data.paragraphContents,
          data.story_id,
          data.chapter_id
        ),
      {
        onMutate: () => {
          alertDispatch({ type: BEGIN });
        },
        onSuccess: () => {
          alertDispatch({ type: SUCCESS });
          queryClient.invalidateQueries(["myStories"]);
        },
      }
    );
  };

  const useRestoreChapterHistory = () => {
    return useMutation(
      (data) =>
        restoreChapterHistory(data.story_id, data.chapter_id, data.history_id),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries([`myStories`]);
        },
      }
    );
  };

  const useAddChapter = () => {
    return useMutation((data) => addChapter(data.story_id), {
      onMutate: () => {
        alertDispatch({ type: BEGIN });
      },
      onSuccess: (data) => {
        alertDispatch({ type: SUCCESS });
        queryClient.invalidateQueries([`myStories`]);
      },
    });
  };

  const useDeleteChapter = () => {
    return useMutation(
      (data) => deleteChapter(data.story_id, data.chapter_id),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries([`myStories`]);
        },
      }
    );
  };

  const usePublishChapter = () => {
    return useMutation(
      (data) => publishChapter(data.story_id, data.chapter_id),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries([`myStories`]);
        },
      }
    );
  };

  const useUnpublishChapter = () => {
    return useMutation(
      (data) => unpublishChapter(data.story_id, data.chapter_id),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries([`myStories`]);
        },
      }
    );
  };

  const useGrantCollaboratorAccess = () => {
    return useMutation(
      (data) => grantCollaboratorAccess(data.story_id, data.user_id),
      {
        onSuccess: (data) => {
          alertDispatch({
            type: SUCCESS,
            payload: { showAlert: true, msg: "You've accepted request!" },
          });
          clearAlert();
          queryClient.invalidateQueries(["myStories"]);
          queryClient.invalidateQueries(["notifications", "collab"]);
        },
        onError: (error) => {
          const backendMessage =
            error.response && error.response.data
              ? error.response.data.msg
              : error.message;
          alertDispatch({ type: ERROR, payload: { msg: backendMessage } });
          clearAlert();
        },
      }
    );
  };

  const useDeclineCollaboratorAccess = () => {
    return useMutation((data) => declineCollaboratorAccess(data.req_id), {
      /*  onMutate: (variables) => {
        console.log("MUTATION BEGINS");
        const stories = queryClient.getQueryData(["myStories"]);
        console.log(variables);
        const newStories = stories.map((story) => {
          const newStory = { ...story }; // Shallow copy
          newStory.collabRequests = story.collabRequests.filter(
            (cr) => String(cr._id) !== String(variables.collab._id)
          );
          return newStory;
        });
        queryClient.setQueryData(["myStories"], () => [...newStories]);
        console.log("SET QUERY DATA");
      }, */
      onSuccess: (data) => {
        console.log("DECLINE SUCCESS");
        queryClient.invalidateQueries(["myStories"]);
        queryClient.invalidateQueries(["notifications", "collab"]);
      },
    });
  };

  const useDeclinePullRequest = () => {
    return useMutation((data) => declinePullRequest(data.req_id), {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["myStories"]);
        queryClient.invalidateQueries(["notifications", "collab"]);
      },
      onError: (error) => {
        console.log(error);
        const backendMessage =
          error.response && error.response.data
            ? error.response.data.msg
            : error.message;
        alertDispatch({
          type: ERROR,
          payload: { msg: backendMessage },
        });
        clearAlert();
      },
    });
  };

  const useMergeFork = () => {
    return useMutation((data) => mergeFork(data.fork_id), {
      onSuccess: (data) => {
        alertDispatch({
          type: SUCCESS,
          payload: {
            showAlert: true,
            msg: "You've successfully merged the fork!",
          },
        });
        clearAlert();
        queryClient.invalidateQueries(["myStories"]);
        queryClient.invalidateQueries(["notifications", "collab"]);
      },
      onError: (error) => {
        console.log(error);
        const backendMessage =
          error.response && error.response.data
            ? error.response.data.msg
            : error.message;
        alertDispatch({
          type: ERROR,
          payload: { msg: backendMessage },
        });
        clearAlert();
      },
    });
  };

  const useRestoreMergeHistory = () => {
    return useMutation((data) => restoreMergeHistory(data.history_id), {
      onSuccess: (data) => {
        console.log("success!");
        alertDispatch({
          type: SUCCESS,
          payload: {
            showAlert: true,
            msg: "You've successfully restored your story history!",
          },
        });
        clearAlert();
        queryClient.invalidateQueries(["myStories"]);
      },
      onError: (error) => {
        console.log(error);
        const backendMessage =
          error.response && error.response.data
            ? error.response.data.msg
            : error.message;
        alertDispatch({ type: ERROR, payload: { msg: backendMessage } });
        clearAlert();
      },
    });
  };

  return (
    <MyStoryContext.Provider
      value={{
        storyState,
        alertState,
        getMyStories,
        setMyStory,
        getTags,
        createStory,
        deleteStory,
        updateCover,
        setEditStory,
        setEditChapter,
        saveChapter,
        addChapter,
        updateStory,
        sendGptPrompt,
        declineCollaboratorAccess,
        showErrorAlert,

        useCreateStory,
        useDeleteStory,
        useSaveChapter,
        useRestoreChapterHistory,
        useAddChapter,
        useDeleteChapter,
        usePublishChapter,
        useUnpublishChapter,
        useGrantCollaboratorAccess,
        useDeclineCollaboratorAccess,
        useDeclinePullRequest,
        useMergeFork,
        useRestoreMergeHistory,
      }}
    >
      {children}
    </MyStoryContext.Provider>
  );
};

/* 

REMOVED DISPATCHES

*/
