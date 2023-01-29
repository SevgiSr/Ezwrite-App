import { useEffect } from "react";
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { MyStory } from "../components";
import { Navigate, useNavigate } from "react-router-dom";

function MyStories() {
  const navigate = useNavigate();
  const { storyState, getMyStories } = useContext(MyStoryContext);

  useEffect(() => {
    getMyStories();
  }, []);

  return (
    <div className="container">
      <button onClick={() => navigate("/newStory")}>Create story</button>
      <div className="my-stories">
        {storyState.myStories.map((story) => {
          return <MyStory key={story._id} {...story} />;
        })}
      </div>
    </div>
  );
}

export default MyStories;
