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
        <Cover />
      </div>
      <div className="content">
        <Link to={`/story/${story._id}`}>
          <h3>{story.title}</h3>
        </Link>
        <div className="author">{story.author.name} tarafından</div>
        <div className="meta-data">
          <div className="read-count">
            <GoEye />
            1.6K
          </div>
          <div className="vote-count">
            <BsFillStarFill />
            103
          </div>
          <div className="part-count">
            <AiOutlineBars />9
          </div>
        </div>
        <div className="description">{story.description}</div>
      </div>
    </StyledStory>
  );
};

//learn how to add param routes

export default Story;
