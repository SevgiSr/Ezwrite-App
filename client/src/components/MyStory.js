import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyStoryContext } from "../context/myStoryContext";
import StyledMyStory from "./styles/MyStory.styled";
import src from "./cover.jpg";
import Cover from "./Cover";

const MyStory = ({ story }) => {
  const navigate = useNavigate();
  const { setEditStory } = useContext(MyStoryContext);

  const handleClick = () => {
    navigate(`/${story._id}`);
    setEditStory(story._id);
  };
  return (
    <StyledMyStory>
      <div className="cover">
        <Cover width="80px" height="125px" />
      </div>
      <div className="info">
        <h3>{story.title}</h3>
        <div className="publish-count">3 Taslak</div>
        <div className="update-date">
          <div className="date">Güncellenme Zamanı Oca 27, 2023</div>
          <div className="time">02:38PM</div>
        </div>
        <div className="meta-data"></div>
      </div>
      <div className="buttons">
        <button onClick={handleClick}>Edit Story</button>
        <button>Delete Story</button>
      </div>
    </StyledMyStory>
  );
};

//learn how to add param routes

export default MyStory;
