import { AiFillDislike, AiOutlineBars } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import styled from "styled-components";

function MetadataBasic({ views, upvotes, downvotes, chapters }) {
  return (
    <StyledMetadata>
      <div>
        <div className="icon">
          <GoEye />
        </div>
        {views}
      </div>
      <div>
        <div className="icon">
          <BsFillStarFill />
        </div>
        {upvotes}
      </div>
      <div>
        <div className="icon">
          <AiFillDislike />
        </div>
        {downvotes}
      </div>
      <div>
        <div className="icon">
          <AiOutlineBars />
        </div>
        {chapters}
      </div>
    </StyledMetadata>
  );
}

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

export default MetadataBasic;
