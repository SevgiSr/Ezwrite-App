import { useState } from "react";
import Cover from "../Cover";
import Metadata from "../Metadata";
import UserLine from "../UserUI/UserLine";
import StyledStoryCardRanked from "../styles/StoryCardRanked.styled";
import StoryModal from "../StoryModal";

function StoryCardRanked({ story }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(story.rank);
  return (
    <StyledStoryCardRanked>
      <div className={"details-modal " + (isModalOpen && "close")}>
        <UserLine user={story.author} />
        <div className="description">{story.description}</div>
        <div className="metadata">
          <Metadata
            views={story.views}
            upvotes={story.votesCount.upvotes}
            downvotes={story.votesCount.downvotes}
            comments={story.comments.length}
          />
        </div>
      </div>

      <div className="story-ranked" onClick={() => setIsModalOpen(true)}>
        <div className="rank">
          <span>1st</span> in {story.rank}
        </div>
        <div className="cover">
          <Cover filename={story._id} width="135px" />
        </div>
        <div className="title">{story.title}</div>
      </div>

      <StoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        story={story}
      />
    </StyledStoryCardRanked>
  );
}

export default StoryCardRanked;
