import { AiOutlineBars } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";
import Cover from "./Cover";
import StyledStoryDetailed from "./styles/StoryDetailed.styled";

const StoryDetailed = ({ story }) => {
  if (!story) return null;
  return (
    <StyledStoryDetailed>
      <Link className="link" to={`/story/${story._id}`}>
        <div className="cover">
          <Cover filename={story._id} width="133px" />
        </div>
        <div className="content">
          <h3 className="title">{story.title}</h3>

          <div className="author">{story.author.name}sevgi tarafından</div>
          <div className="meta-data">
            <div>
              <div className="icon">
                <GoEye />
                <span>Reads</span>
              </div>
              <div className="count">0</div>
            </div>
            <div>
              <div className="icon">
                <BsFillStarFill />
                <span>Votes</span>
              </div>
              <div className="count">106</div>
            </div>
            <div>
              <div className="icon">
                <AiOutlineBars />
                <span>Parts</span>
              </div>
              <div className="count">9</div>
            </div>
          </div>
          <div className="description">
            {story.description.slice(0, 486)}
            {story.description.length > 100 && "..."}
          </div>
        </div>
      </Link>
    </StyledStoryDetailed>
  );
};

export default StoryDetailed;
