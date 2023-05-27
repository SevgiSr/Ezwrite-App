import { Link } from "react-router-dom";
import StyledReadingLists from "./styles/ReadingLists.styled";
import StoryDetailed from "./StoryDetailed";
import Cover from "./Cover";
import { BsChevronRight, BsFillStarFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { AiOutlineBars } from "react-icons/ai";

function ReadingLists({ readingLists }) {
  return (
    <StyledReadingLists>
      <header>
        <div>{readingLists.length} Reading Lists</div>
      </header>
      <div className="main">
        {readingLists?.map((readingList) => {
          console.log(readingList);
          return (
            <div key={readingList._id} className="readingList">
              <Link className="title">
                <span className="text">{readingList.title}</span>
                <span className="icon">
                  <BsChevronRight />
                </span>
              </Link>

              {readingList.stories?.map((story) => {
                return <Story key={story._id} story={story} />;
              })}
            </div>
          );
        })}
      </div>
    </StyledReadingLists>
  );
}

function Story({ story }) {
  return (
    <div className="story">
      <Cover filename={story._id} width={"123px"} />
      <div className="title">{story.title}</div>
      <div className="meta-data">
        <div>
          <div className="icon">
            <GoEye />
          </div>
          <div className="count">0</div>
        </div>
        <div>
          <div className="icon">
            <BsFillStarFill />
          </div>
          <div className="count">106</div>
        </div>
        <div>
          <div className="icon">
            <AiOutlineBars />
          </div>
          <div className="count">9</div>
        </div>
      </div>
    </div>
  );
}

export default ReadingLists;