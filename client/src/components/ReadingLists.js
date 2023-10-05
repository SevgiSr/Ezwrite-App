import { Link } from "react-router-dom";
import StyledReadingLists from "./styles/ReadingLists.styled";
import StoryDetailed from "./";
import Cover from "./Cover";
import { BsChevronRight, BsFillStarFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { AiOutlineBars } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { ImBooks } from "react-icons/im";

function ReadingLists({ readingLists }) {
  const { userState } = useContext(UserContext);
  return (
    <StyledReadingLists>
      {readingLists.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <ImBooks />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't read any stories yet!
          </div>
        </div>
      ) : (
        <div className="main">
          {readingLists?.map((readingList) => {
            return (
              <div key={readingList._id} className="readingList">
                <Link to={`/list/${readingList._id}`} className="title">
                  <span className="text">{readingList.title}</span>
                  <span className="icon">
                    <BsChevronRight />
                  </span>
                </Link>
                <div className="stories">
                  <ReadingList stories={readingList.stories} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </StyledReadingLists>
  );
}

function ReadingList({ stories }) {
  return (
    <div className="reading-list">
      <Cover filename={stories[stories.length - 1]?._id} width={"123px"} />
      <Cover filename={stories[stories.length - 2]?._id} width={"123px"} />
      <Cover filename={stories[stories.length - 3]?._id} width={"123px"} />
    </div>
  );
}

export default ReadingLists;
