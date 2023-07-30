import { Link } from "react-router-dom";
import StyledTag from "./styles/Tag.styled";

function Tag({ tag, fontSize }) {
  return (
    <StyledTag>
      <Link
        to={`/stories/search/tags/${tag.name}`}
        className="link"
        style={{ fontSize: fontSize ? fontSize : "1rem" }}
      >
        {tag.name} ({tag.count})
      </Link>
    </StyledTag>
  );
}

export default Tag;
