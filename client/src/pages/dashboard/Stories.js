import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { useParams } from "react-router-dom";
import Story from "../../components/Story";
import StyledStories from "./styles/Stories.styled";

function Option({ id, label }) {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.value);
    setIsChecked(!isChecked);
  };
  return (
    <div className="option">
      <input value={isChecked} onChange={handleChange} id={id} type="radio" />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function Stories() {
  const { state, getByCategory, getByQuery } = useContext(StoryContext);
  const params = useParams();
  useEffect(() => {
    if (params.query) {
      getByQuery(params.query);
    } else if (params.category) {
      getByCategory(params.category);
    }
  }, [params]);

  return (
    <StyledStories>
      <div className="filters">
        <div className="filter">
          <h4 className="title">Length</h4>
          <Option id="any" label="Any Lenght" />
          <Option id="1-10" label="1-10 Parts" />
          <Option id="10-20" label="10-20 Parts" />
          <Option id="20-50" label="20-50 Parts" />
          <Option id="50-more" label="50 Parts or more" />
        </div>
      </div>
      <div className="stories">
        {state.stories.map((story) => {
          return <Story key={story._id} story={story} />;
        })}
      </div>
    </StyledStories>
  );
}

export default Stories;
