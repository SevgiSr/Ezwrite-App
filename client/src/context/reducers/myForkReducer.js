import { EDIT_MY_CHAPTER_SUCCESS } from "../actions";

const myForkReducer = (state, action) => {
  if (action.type === EDIT_MY_CHAPTER_SUCCESS) {
    return {
      ...state,
      chapter: action.payload.chapter,
      story: action.payload.story,
      chapters: action.payload.chapters,
    };
  }
};

export default myForkReducer;
