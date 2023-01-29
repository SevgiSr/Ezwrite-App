import { useContext, useEffect } from "react";
import { StoryContext } from "../../context/storyContext";
import { useParams } from "react-router-dom";
import Story from "../../components/Story";

function Stories() {
  const { state, getByCategory } = useContext(StoryContext);
  const { category } = useParams();
  useEffect(() => {
    getByCategory(category);
  }, []);
  return (
    <div>
      {state.stories.map((story) => {
        return <Story key={story._id} story={story} />;
      })}
    </div>
  );
}

export default Stories;
