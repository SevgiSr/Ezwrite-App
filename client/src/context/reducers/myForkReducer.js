import { EDIT_MY_CHAPTER_SUCCESS } from "../actions";

const myForkReducer = (state, action) => {
  if (action.type === EDIT_MY_CHAPTER_SUCCESS) {
    return {
      ...state,
      story: action.payload.story,
      chapters: action.payload.chapters,
      chapter: action.payload.chapter,
    };
  }
};

export default myForkReducer;
