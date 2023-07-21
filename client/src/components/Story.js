import StyledStory from "./styles/Story.styled";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { AiFillDislike, AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import Cover from "./Cover";
import { useEffect, useState } from "react";

const Story = ({ story }) => {
  const [viewCount, setViewCount] = useState(0);
  const [storyVotes, setStoryVotes] = useState({ upvotes: 0, downvotes: 0 });
  useEffect(() => {
    let count = 0;
    story.chapters.map((chapter) => {
      count += Number(chapter.views);
    });

    setViewCount(count);
    /* 
    let votes = { upvotes: 0, downvotes: 0 };
    story.chapters.map((chapter) => {
      console.log(chapter);
      votes.upvotes += chapter.votes.upvotes;
      votes.downvotes += chapter.votes.downvotes;
    });
    setStoryVotes(votes); */
  }, []);

  if (!story) return null;
  return (
    <StyledStory>
      <div className="cover">
        <Cover filename={story._id} width="140px" />
      </div>
      <div className="content">
        <Link className="title flex-row" to={`/story/${story._id}`}>
          <h3>{story.title}</h3>
          {story.visibility === "draft" && (
            <p className="visibility">DRAFT (only visible to you)</p>
          )}
        </Link>
        <div className="author">{story.author.name} tarafından</div>
        <div className="meta-data">
          <div>
            <div className="icon">
              <GoEye />
            </div>
            <div className="count">{story.views}</div>
          </div>
          <div>
            <div className="icon">
              <BsFillStarFill />
            </div>
            <div className="count">{story.votesCount.upvotes}</div>
          </div>
          <div>
            <div className="icon">
              <AiFillDislike />
            </div>
            <div className="count">{story.votesCount.downvotes}</div>
          </div>
          <div>
            <div className="icon">
              <AiOutlineBars />
            </div>
            <div className="count">{story.chapters.length}</div>
          </div>
        </div>
        <div className="description">
          {story.description.slice(0, 486)}
          {story.description.length > 100 && "..."}
        </div>
      </div>
    </StyledStory>
  );
};

//learn how to add param routes

export default Story;
