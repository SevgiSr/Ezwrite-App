import {
  CREATE_STORY_BEGIN,
  CREATE_STORY_ERROR,
  CREATE_STORY_SUCCESS,
  EDIT_MY_CHAPTER_SUCCESS,
  EDIT_STORY_SUCCESS,
  GET_MY_CHAPTERS_SUCCESS,
  GET_MY_STORIES_SUCCESS,
  SET_EDIT_STORY,
} from "../actions";

const myStoryReducer = (state, action) => {
  if (action.type === GET_MY_STORIES_SUCCESS) {
    return {
      ...state,
      myStories: action.payload.myStories,
    };
  }

  if (action.type === CREATE_STORY_SUCCESS) {
    return {
      ...state,
    };
  }

  if (action.type === GET_MY_CHAPTERS_SUCCESS) {
    return {
      ...state,
      story: action.payload.story,
      chapters: action.payload.chapters,
    };
  }

  if (action.type === SET_EDIT_STORY) {
    const story = state.myStories.find(
      (story) => story._id === action.payload.id
    );
    return {
      ...state,
      story,
    };
  }

  if (action.type === EDIT_MY_CHAPTER_SUCCESS) {
    return {
      ...state,
      chapter: action.payload.chapter,
      story: action.payload.story,
    };
  }

  if (action.type === EDIT_STORY_SUCCESS) {
    return {
      ...state,
      chapter: action.payload.chapter,
    };
  }
};

export default myStoryReducer;
