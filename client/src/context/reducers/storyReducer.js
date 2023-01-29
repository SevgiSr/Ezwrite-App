import { GET_STORIES_SUCCESS } from "../actions";

const storyReducer = (state, action) => {
  if (action.type === GET_STORIES_SUCCESS) {
    return {
      ...state,
      stories: action.payload.stories,
    };
  }
};

export default storyReducer;
