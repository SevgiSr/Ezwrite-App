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

export const ForkContext = React.createContext();

export const ForkProvider = ({ children }) => {
  const { authFetch } = useContext(UserContext);

  const getFork = async (fork_id) => {
    try {
      const { data } = await authFetch.get(`/myForks/${fork_id}`);
      const { fork } = data;
      return fork;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addChapterConv = async (chapter_id, comment_content) => {
    try {
      const { data } = await authFetch.post(
        `/myForks/chapters/${chapter_id}/conversations`,
        {
          comment_content,
        }
      );
      const { newConv } = data;
      return newConv;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const deleteChapterConv = async (chapter_id, conv_id) => {
    try {
      await authFetch.delete(
        `/myForks/chapters/${chapter_id}/conversations/${conv_id}`
      );
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addParagraphConv = async (paragraph_id, comment_content) => {
    try {
      const { data } = await authFetch.post(
        `/myForks/paragraphs/${paragraph_id}/conversations`,
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
        `/myForks/paragraphs/${paragraph_id}/conversations/${conv_id}`
      );
    } catch (error) {
      console.log(error);
      console.log(error.response.data.msg);
    }
  };

  const addConvComment = async (conv_id, comment_content) => {
    try {
      const { data } = await authFetch.post(
        `/myForks/conversations/${conv_id}`,
        {
          comment_content,
        }
      );
      const { newConv } = data;

      return newConv;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteConvComment = async (conv_id, comment_id) => {
    try {
      await authFetch.delete(
        `/myForks/conversations/${conv_id}/comments/${comment_id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* COMMENT MUTATIONS */

  const queryClient = useQueryClient();

  const useAddForkChapterConv = () => {
    return useMutation((data) => addChapterConv(data.dest, data.comment), {
      onSuccess: () => {
        queryClient.invalidateQueries(["fork"]);
      },
    });
  };

  const useDeleteForkChapterConv = () => {
    return useMutation((data) => deleteChapterConv(data.dest, data.conv_id), {
      onSuccess: () => {
        queryClient.invalidateQueries(["fork"]);
      },
    });
  };

  const useAddForkParagraphConv = () => {
    return useMutation((data) => addParagraphConv(data.dest, data.comment), {
      onSuccess: () => {
        queryClient.invalidateQueries(["fork"]);
      },
    });
  };

  const useDeleteForkParagraphConv = () => {
    return useMutation((data) => deleteParagraphConv(data.dest, data.conv_id), {
      onSuccess: () => {
        queryClient.invalidateQueries(["fork"]);
      },
    });
  };

  const useAddForkConvComment = () => {
    return useMutation((data) => addConvComment(data.dest, data.comment), {
      onSuccess: () => {
        queryClient.invalidateQueries(["fork"]);
      },
    });
  };

  const useDeleteForkConvComment = () => {
    return useMutation(
      (data) => deleteConvComment(data.conv_id, data.comment_id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["fork"]);
        },
      }
    );
  };

  return (
    <ForkContext.Provider
      value={{
        getFork,

        useAddForkChapterConv,
        useDeleteForkChapterConv,
        useAddForkParagraphConv,
        useDeleteForkParagraphConv,
        useAddForkConvComment,
        useDeleteForkConvComment,
      }}
    >
      {children}
    </ForkContext.Provider>
  );
};
