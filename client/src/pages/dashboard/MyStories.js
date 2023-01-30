import { useEffect } from "react";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import { MyStory } from "../../components";
import { Navigate, useNavigate } from "react-router-dom";
import StyledMyStories from "./styles/MyStories.styled";
import Story from "../../components/Story";
import OrangeLinks from "../../components/OrangeLinks";

function MyStories() {
  const navigate = useNavigate();
  const { storyState, getMyStories } = useContext(MyStoryContext);

  useEffect(() => {
    getMyStories();
  }, []);

  return (
    <StyledMyStories>
      <div className="container">
        <header>
          <h2>My Stories</h2>
          <button onClick={() => navigate("/newStory")}>Create story</button>
        </header>

        <div className="stories-container">
          <OrangeLinks links={[{ to: "", label: "Tüm Hikayelerim" }]} />
          {storyState.myStories.map((story) => {
            return <MyStory key={story._id} story={story} />;
          })}
        </div>
      </div>
    </StyledMyStories>
  );
}

export default MyStories;
