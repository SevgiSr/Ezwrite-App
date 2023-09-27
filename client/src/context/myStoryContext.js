import React, { useReducer, useContext } from "react";
import myStoryReducer from "./reducers/myStoryReducer";
import { alertReducer, initialAlertState } from "./reducers/alertReducer";
import axios from "axios";

import {
  BEGIN,
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
import { useNavigate } from "react-router-dom";
import {
  initialMutationState,
  mutationAlertReducer,
} from "./reducers/mutationAlertReducer";

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

  const [mutationState, mutationDispatch] = useReducer(
    mutationAlertReducer,
    initialMutationState
  );

  const { authFetch } = useContext(UserContext);

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
      console.log(error);
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
      await authFetch.patch(`/myStories/${story_id}/${chapter_id}`, {
        title,
        paragraphContents,
      });
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
      const { data } = await authFetch.patch(`/myStories/${id}`);
      const { chapter_id, story_id } = data;
      return { chapter_id, story_id };
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const deleteChapter = async (story_id, chapter_id) => {
    try {
      await authFetch.delete(`/myStories/${story_id}/${chapter_id}`);
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
      console.log(fork);
      return fork;
    } catch (error) {
      console.log(error);
    }
  };

  /* MUTATIONS */

  const queryClient = useQueryClient();

  const useCreateStory = () => {
    return useMutation((data) => createStory(data.cover, data.storyDetails), {
      onMutate: () => {
        mutationDispatch({ type: MUTATION_BEGIN });
      },
      onSuccess: () => {
        mutationDispatch({ type: MUTATION_SUCCESS });
        queryClient.invalidateQueries(["myStories"]);
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
          mutationDispatch({ type: MUTATION_BEGIN });
        },
        onSuccess: () => {
          mutationDispatch({ type: MUTATION_SUCCESS });
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
        mutationDispatch({ type: MUTATION_BEGIN });
      },
      onSuccess: (data) => {
        mutationDispatch({ type: MUTATION_SUCCESS });
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

  const mergeFork = async (fork_id) => {
    try {
      await authFetch.patch(`/myStories/collaborations/forks/${fork_id}`);
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
        grantCollaboratorAccess,
        mergeFork,

        useCreateStory,
        useDeleteStory,
        useSaveChapter,
        useRestoreChapterHistory,
        useAddChapter,
        mutationState,
        useDeleteChapter,
        usePublishChapter,
        useUnpublishChapter,
      }}
    >
      {children}
    </MyStoryContext.Provider>
  );
};

/* 

REMOVED DISPATCHES

*/
