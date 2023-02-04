import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoryContext } from "../../context/storyContext";
import StyledStory from "./styles/Story.styled";
import Cover from "../../components/Cover";
import ProfilePicture from "../../components/ProfilePicture";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";

function Story() {
  const { state, getStory } = useContext(StoryContext);
  const { story } = state;
  const { story_id } = useParams();

  //story ay appear empty on first renders so use state?.author?.name
  useEffect(() => {
    getStory(story_id);
  }, []);

  return (
    <StyledStory>
      <StoryCard story={story} />
      <div className="story-info">
        <div className="author">
          <ProfilePicture width="30px" />
          <span className="username">{story?.author?.name}</span>
        </div>
        <div className="status">Ongoing</div>
        <div className="desc">{story?.description}</div>
      </div>
      <div className="table-contents">
        <h2>Table of Contents</h2>
        <ul>
          {story?.chapters?.map((chapter) => {
            return <li key={chapter._id}>{chapter.title}</li>;
          })}
        </ul>
      </div>
    </StyledStory>
  );
}

const StoryCard = ({ story }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${story._id}/${story.chapters[0]._id}`);
  };
  return (
    <div className="story-card">
      <div className="cover">
        <Cover />
      </div>
      <div className="info">
        <h3>{story.title}</h3>

        <div className="stats">
          <div className="item">
            <div className="label">
              <GoEye />
              Reads
            </div>
            <div className="value">88.8K</div>
          </div>
          <div className="item">
            <div className="label">
              <BsFillStarFill />
              Votes
            </div>
            <div className="value">1,1K</div>
          </div>
          <div className="item">
            <div className="label">
              <AiOutlineBars />
              Parts
            </div>
            <div className="value">10</div>
          </div>
        </div>
        <button onClick={handleClick}>Start Reading</button>
      </div>
    </div>
  );
};

export default Story;
