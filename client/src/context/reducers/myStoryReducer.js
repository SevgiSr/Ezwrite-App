import {
  EDIT_MY_CHAPTER_SUCCESS,
  GET_MY_STORY_SUCCESS,
  SEND_GPT_PROMPT,
  SET_EDIT_STORY,
} from "../actions";

const myStoryReducer = (state, action) => {
  if (action.type === GET_MY_STORY_SUCCESS) {
    return {
      ...state,
      myStory: action.payload.myStory,
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

  if (action.type === SEND_GPT_PROMPT) {
    return {
      ...state,
      gptResponse: action.payload.GPTresponse,
    };
  }
};

export default myStoryReducer;
