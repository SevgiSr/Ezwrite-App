import {
  ADD_CHAPTER_CONV_SUCCESS,
  ADD_CONV_COMMENT_SUCCESS,
  ADD_PARAGRAPH_CONV_SUCCESS,
  GET_ALL_STORIES_SUCCESS,
  GET_CHAPTER_SUCCESS,
  GET_STORIES_SUCCESS,
  GET_STORY_SUCCESS,
  UNVOTE_CHAPTER_SUCCESS,
  VOTE_CHAPTER_SUCCESS,
} from "../actions";

const storyReducer = (state, action) => {
  if (action.type === GET_STORIES_SUCCESS) {
    return {
      ...state,
      stories: action.payload.stories,
      users: action.payload.users,
    };
  }

  if (action.type === GET_ALL_STORIES_SUCCESS) {
    return {
      ...state,
      stories: action.payload.stories,
    };
  }
  if (action.type === GET_STORY_SUCCESS) {
    return {
      ...state,
      story: action.payload.story,
    };
  }

  if (action.type === GET_CHAPTER_SUCCESS) {
    return {
      ...state,
      story: action.payload.story,
      chapter: action.payload.chapter,
      votes: action.payload.chapter.votesCount,
      myVote: action.payload.chapter.myVote,
    };
  }
  if (action.type === ADD_CHAPTER_CONV_SUCCESS) {
    return {
      ...state,
      chapterConvs: [...state.chapterConvs, action.payload.newConv],
    };
  }

  if (action.type === ADD_PARAGRAPH_CONV_SUCCESS) {
    const updatedParagraphs = state.chapter.paragraphs.map((paragraph) => {
      if (paragraph._id === action.payload.updatedParagraph._id) {
        return {
          ...paragraph,
          comments: action.payload.newConvs,
        };
      }
      return paragraph;
    });
    return {
      ...state,
      chapter: { ...state.chapter, paragraphs: updatedParagraphs },
    };
  }

  if (action.type === VOTE_CHAPTER_SUCCESS) {
    const value = Number(action.payload.vote_value);
    const votes = { ...state.votes };
    console.log(state.votes);
    if (value === 1) {
      votes.upvotes = state.votes.upvotes + 1;
      if (state.myVote === -1) {
        votes.downvotes = state.votes.downvotes - 1;
      }
    } else if (value === -1) {
      votes.downvotes = state.votes.downvotes + 1;
      if (state.myVote === 1) {
        votes.upvotes = state.votes.upvotes - 1;
      }
    }
    return {
      ...state,
      votes: votes,
      myVote: value,
    };
  }
  if (action.type === UNVOTE_CHAPTER_SUCCESS) {
    const value = Number(action.payload.vote_value);
    const votes = { ...state.votes };
    console.log(state.votes);
    if (value === 1) {
      votes.upvotes = state.votes.upvotes - 1;
    } else if (value === -1) {
      votes.downvotes = state.votes.downvotes - 1;
    }
    return {
      ...state,
      votes: votes,
      myVote: 0,
    };
  }
  if (action.type === ADD_CONV_COMMENT_SUCCESS) {
    const newConv = action.payload.newConv;

    if (action.payload.type === "paragraph") {
      const updatedParagraphs = state.chapter.paragraphs.map((paragraph) => {
        if (paragraph._id === action.payload.updatedParagraph) {
          const index = paragraph.comments.findIndex(
            (c) => c._id === newConv._id
          );
          const newConvs = [...paragraph.comments];
          newConvs[index] = newConv;
          return {
            ...paragraph,
            comments: [...newConvs],
          };
        }
        return paragraph;
      });
      return {
        ...state,
        chapter: { ...state.chapter, paragraphs: updatedParagraphs },
      };
    }

    if (action.payload.type === "chapter") {
      const index = state.chapterConvs.findIndex((c) => c._id === newConv._id);
      const newConvs = [...state.chapterConvs];
      newConvs[index] = newConv;

      return {
        ...state,
        chapterConvs: newConvs,
      };
    }
  }
};

export default storyReducer;
