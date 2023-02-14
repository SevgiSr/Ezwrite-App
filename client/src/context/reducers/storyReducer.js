import {
  ADD_CHAPTER_CONV_SUCCESS,
  ADD_CONV_COMMENT_SUCCESS,
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
      chapterConvs: action.payload.chapterConvs,
    };
  }
  if (action.type === ADD_CHAPTER_CONV_SUCCESS) {
    return {
      ...state,
      chapterConvs: [...state.chapterConvs, action.payload.newConv],
    };
  }
  if (action.type === ADD_CONV_COMMENT_SUCCESS) {
    //conversation with new subcomments
    const newConv = action.payload.newConv;
    const index = state.chapterConvs.findIndex((c) => c._id === newConv._id);
    const newConvs = [...state.chapterConvs];
    newConvs[index] = newConv;

    return {
      ...state,
      chapterConvs: newConvs,
    };
  }
};

export default storyReducer;
