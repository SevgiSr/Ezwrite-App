import { UserContext } from "./userContext";
import React, { useReducer, useContext } from "react";

import {
  BEGIN,
  EDIT_MY_CHAPTER_SUCCESS,
  ERROR,
  MUTATION_BEGIN,
  MUTATION_SUCCESS,
  SUCCESS,
} from "./actions";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  initialMutationState,
  mutationAlertReducer,
} from "./reducers/mutationAlertReducer";
import myForkReducer from "./reducers/myForkReducer";

const initialForkState = {
  //all stories
  myForks: [],

  fork: {},

  //chapters
  story: {},
  chapters: [],

  //chapter
  chapter: {},

  gptResponse: "",
};

export const MyForkContext = React.createContext();

export const MyForkProvider = ({ children }) => {
  const [forkState, dispatch] = useReducer(myForkReducer, initialForkState);
  const [mutationState, mutationDispatch] = useReducer(
    mutationAlertReducer,
    initialMutationState
  );

  const { authFetch } = useContext(UserContext);

  const getMyForks = async () => {
    try {
      console.log("GETTING FORKS");
      const { data } = await authFetch.get("/myForks");
      const { myForks } = data;
      console.log(myForks);
      return myForks;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFork = async (fork_id) => {
    try {
      await authFetch.delete(`/myForks/delete/${fork_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const setEditForkChapter = async (story, chapter, chapters) => {
    try {
      dispatch({
        type: EDIT_MY_CHAPTER_SUCCESS,
        payload: { story, chapter, chapters },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const saveForkChapter = async (
    title,
    paragraphContents,
    fork_id,
    chapter_id
  ) => {
    try {
      console.log("saving fork");
      await authFetch.patch(`/myForks/${fork_id}/${chapter_id}`, {
        title,
        paragraphContents,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const restoreForkChapterHistory = async (fork_id, chapter_id, history_id) => {
    try {
      await authFetch.patch(`/myForks/history/${fork_id}/${chapter_id}`, {
        history_id,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addForkChapter = async (id) => {
    try {
      const { data } = await authFetch.patch(`/myForks/${id}`);
      const { chapter_id, fork_id } = data;
      return { chapter_id, fork_id };
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const deleteForkChapter = async (fork_id, chapter_id) => {
    try {
      await authFetch.delete(`/myForks/${fork_id}/${chapter_id}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const sendPullRequest = async (fork_id) => {
    try {
      await authFetch.patch(`/myForks/pull/${fork_id}`);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  /* MUTATIONS */
  const queryClient = useQueryClient();

  const useDeleteFork = () => {
    return useMutation((data) => deleteFork(data.fork_id), {
      onMutate: (variables) => {
        const data = queryClient.getQueryData(["myForks"]);
        const data_filtered = data.filter((f) => f._id !== variables.fork_id);
        queryClient.setQueryData(["myForks"], () => data_filtered);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["myForks"]);
      },
    });
  };

  const useSaveForkChapter = () => {
    return useMutation(
      (data) =>
        saveForkChapter(
          data.title,
          data.paragraphContents,
          data.fork_id,
          data.chapter_id
        ),
      {
        onMutate: () => {
          mutationDispatch({ type: MUTATION_BEGIN });
        },
        onSuccess: () => {
          mutationDispatch({ type: MUTATION_SUCCESS });
          queryClient.invalidateQueries(["myForks"]);
        },
      }
    );
  };

  const useRestoreForkChapterHistory = () => {
    return useMutation(
      (data) =>
        restoreForkChapterHistory(
          data.fork_id,
          data.chapter_id,
          data.history_id
        ),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries([`myForks`]);
        },
      }
    );
  };

  const useAddForkChapter = () => {
    return useMutation((data) => addForkChapter(data.fork_id), {
      onMutate: () => {
        mutationDispatch({ type: MUTATION_BEGIN });
      },
      onSuccess: (data) => {
        mutationDispatch({ type: MUTATION_SUCCESS });
        queryClient.invalidateQueries([`myForks`]);
      },
    });
  };

  const useDeleteForkChapter = () => {
    return useMutation(
      (data) => deleteForkChapter(data.fork_id, data.chapter_id),
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries([`myForks`]);
        },
      }
    );
  };

  return (
    <MyForkContext.Provider
      value={{
        getMyForks,
        deleteFork,
        saveForkChapter,
        restoreForkChapterHistory,
        addForkChapter,
        deleteForkChapter,
        mutationState,
        setEditForkChapter,
        forkState,
        sendPullRequest,

        useDeleteFork,
        useSaveForkChapter,
        useRestoreForkChapterHistory,
        useAddForkChapter,
        useDeleteForkChapter,
      }}
    >
      {children}
    </MyForkContext.Provider>
  );
};
