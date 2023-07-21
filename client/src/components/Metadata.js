import { AiFillDislike, AiFillLike } from "react-icons/ai";
import StyledMetadata from "./styles/Metadata.styled";
import { GoEye } from "react-icons/go";
import { FaComment } from "react-icons/fa";

const Metadata = ({ views, upvotes, downvotes, comments }) => {
  return (
    <StyledMetadata>
      <div>
        <span className="icon">
          <GoEye />
        </span>{" "}
        {views}
      </div>
      <div>
        <span className="icon">
          <AiFillLike />
        </span>{" "}
        {upvotes}
      </div>
      <div>
        <span className="icon">
          <AiFillDislike />
        </span>{" "}
        {downvotes}
      </div>
      <div>
        <span className="icon">
          <FaComment />
        </span>{" "}
        {comments ? comments : 0}
      </div>
    </StyledMetadata>
  );
};

export default Metadata;
