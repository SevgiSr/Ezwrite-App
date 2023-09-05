import {
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
      chapters: action.payload.chapters,
      chapter: action.payload.chapter,
      votes: action.payload.chapter.votesCount,
      myVote: action.payload.chapter.myVote,
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
};

export default storyReducer;
