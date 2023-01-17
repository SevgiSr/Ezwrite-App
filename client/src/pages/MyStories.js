import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Story } from "../components";
import { Navigate, useNavigate } from "react-router-dom";

function MyStories() {
  const navigate = useNavigate();
  const { reducerState, getMyStories } = useContext(AppContext);

  useEffect(() => {
    getMyStories();
  }, []);

  return (
    <div className="container">
      <button onClick={() => navigate("/newStory")}>Create story</button>
      <div className="my-stories">
        {reducerState.myStories.map((story) => {
          return <Story key={story._id} {...story} />;
        })}
      </div>
    </div>
  );
}

export default MyStories;
