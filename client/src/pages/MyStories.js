import { useEffect } from "react";
import { useContext } from "react";
import { StoryContext } from "../context/storyContext";
import { Story } from "../components";
import { Navigate, useNavigate } from "react-router-dom";

function MyStories() {
  const navigate = useNavigate();
  const { storyState, getMyStories } = useContext(StoryContext);

  useEffect(() => {
    getMyStories();
  }, []);

  return (
    <div className="container">
      <button onClick={() => navigate("/newStory")}>Create story</button>
      <div className="my-stories">
        {storyState.myStories.map((story) => {
          return <Story key={story._id} {...story} />;
        })}
      </div>
    </div>
  );
}

export default MyStories;
