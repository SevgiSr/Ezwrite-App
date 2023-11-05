import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { GoEye } from "react-icons/go";
import { FaComment } from "react-icons/fa";
import styled from "styled-components";

const MetadataComments = ({ views, upvotes, downvotes, comments }) => {
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

const StyledMetadata = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  color: var(--font2);
  > * {
    display: flex;
    margin-right: 10px;
    .icon {
      font-size: 16px;
      padding-right: 3px;
    }
  }
`;

export default MetadataComments;
