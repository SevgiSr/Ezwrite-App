import Cover from "./Cover";
import StyledStoryCardRanked from "./styles/StoryCardRanked.styled";

function StoryCardRanked({ story }) {
  return (
    <StyledStoryCardRanked>
      <div className="cover">
        <Cover filename={story._id} width="135px" />
      </div>
      <div className="title">{story.title}</div>
    </StyledStoryCardRanked>
  );
}

export default StoryCardRanked;
