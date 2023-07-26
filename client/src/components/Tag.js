import { Link } from "react-router-dom";
import StyledTag from "./styles/Tag.styled";

function Tag({ tag }) {
  return (
    <StyledTag>
      <Link to={`/stories/search/tags/${tag.name}`} className="link">
        {tag.name} ({tag.count})
      </Link>
    </StyledTag>
  );
}

export default Tag;
