import { AiFillDislike, AiOutlineBars } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import styled from "styled-components";

function MetadataDetailed({ views, upvotes, downvotes, chapters }) {
  return (
    <StyledMetadataDetailed>
      <div>
        <div className="icon">
          <GoEye />
          <span>Reads</span>
        </div>
        <div className="count">{views}</div>
      </div>
      <div>
        <div className="icon">
          <BsFillStarFill />
          <span>Votes</span>
        </div>
        <div className="count">{upvotes}</div>
      </div>
      <div>
        <div className="icon">
          <AiFillDislike />
          <span>Downvotes</span>
        </div>
        <div className="count">{downvotes}</div>
      </div>
      <div>
        <div className="icon">
          <AiOutlineBars />
          <span>Parts</span>
        </div>
        <div className="count">{chapters}</div>
      </div>
    </StyledMetadataDetailed>
  );
}

const StyledMetadataDetailed = styled.div`
  color: var(--font2);
  display: flex;
  width: fit-content;
  margin: 10px 0;
  > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    border-right: 1px solid var(--font2);
    padding-right: 8px;

    .count {
      font-size: 12px;
      font-weight: 700;
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;

      span {
        margin-left: 3px;
      }
    }
  }
  > :last-child {
    border-right: none;
  }
`;

export default MetadataDetailed;
