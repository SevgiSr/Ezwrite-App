import StyledStory from "./styles/Story.styled";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import Cover from "./Cover";

const Story = ({ story }) => {
  return (
    <StyledStory>
      <div className="cover">
        <Cover filename={story._id} width="140px" />
      </div>
      <div className="content">
        <Link className="title" to={`/story/${story._id}`}>
          <h3>{story.title}</h3>
        </Link>
        <div className="author">{story.author.name}sevgi tarafından</div>
        <div className="meta-data">
          <div>
            <div className="icon">
              <GoEye />
            </div>
            <div className="count"> 1.6K</div>
          </div>
          <div>
            <div className="icon">
              <BsFillStarFill />
            </div>
            <div className="count">103</div>
          </div>
          <div>
            <div className="icon">
              <AiOutlineBars />
            </div>
            <div className="count">9</div>
          </div>
        </div>
        <div className="description">
          {story.description.slice(0, 100)}
          {story.description.length > 100 && "..."}
        </div>
      </div>
    </StyledStory>
  );
};

//learn how to add param routes

export default Story;
