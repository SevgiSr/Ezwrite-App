import StyledStory from "./styles/Story.styled";
import src from "./cover.jpg";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";

const Story = ({ story }) => {
  return (
    <StyledStory>
      <div className="cover">
        <img src={src} alt="" />
      </div>
      <div className="content">
        <h3>{story.title}</h3>
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
