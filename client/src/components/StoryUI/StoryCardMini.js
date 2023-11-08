import { Link } from "react-router-dom";
import Cover from "../Cover";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import StyledStoryCardMini from "../styles/StoryCardMini.styled";

function StoryCardMini({ story }) {
  if (!story) return null;
  return (
    <StyledStoryCardMini>
      <Link to={`/story/${story._id}`} className="container">
        <Cover filename={story._id} width={"85px"} />
        <div className="title">{story.title}</div>
      </Link>
    </StyledStoryCardMini>
  );
}

export default StoryCardMini;
