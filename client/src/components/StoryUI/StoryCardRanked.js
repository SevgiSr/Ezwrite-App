import { useState } from "react";
import Cover from "../Cover";
import Metadata from "../MetadataUI/MetadataComments";
import UserLine from "../UserUI/UserLine";
import StyledStoryCardRanked from "../styles/StoryCardRanked.styled";
import StoryModal from "../StoryModal";
import { BsFillStarFill } from "react-icons/bs";

function getOrdinalNumber(number) {
  const exceptions = [11, 12, 13];
  const lastDigit = number % 10;
  let suffix = "th";

  if (!exceptions.includes(number % 100)) {
    if (lastDigit === 1) {
      suffix = "st";
    } else if (lastDigit === 2) {
      suffix = "nd";
    } else if (lastDigit === 3) {
      suffix = "rd";
    }
  }

  return `${number}${suffix}`;
}

function StoryCardRanked({ story }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="rank-container">
          <div className="rank-icon icon">
            <BsFillStarFill />
            <div className="rank">{getOrdinalNumber(story.rankCount)}</div>
          </div>
          <div className="rank-cat">in {story.rankName}</div>
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
