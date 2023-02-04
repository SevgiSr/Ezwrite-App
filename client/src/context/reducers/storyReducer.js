import {
  GET_CHAPTER_SUCCESS,
  GET_STORIES_SUCCESS,
  GET_STORY_SUCCESS,
} from "../actions";

const storyReducer = (state, action) => {
  if (action.type === GET_STORIES_SUCCESS) {
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
      chapter: action.payload.chapter,
      author: action.payload.author,
    };
  }
};

export default storyReducer;
