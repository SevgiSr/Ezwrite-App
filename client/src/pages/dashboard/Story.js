import { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StoryContext } from "../../context/storyContext";
import StyledStory from "./styles/Story.styled";
import Cover from "../../components/Cover";
import ProfilePicture from "../../components/ProfilePicture";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";

function Story() {
  const { state, getStory, getProgress, setChapter } = useContext(StoryContext);

  const { story_id } = useParams();
  const location = useLocation();

  const {
    data: progress = {},
    isLoading,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["progress", story_id],
    queryFn: () => getProgress(story_id),
  });

  const { chapters, story } = progress;

  useEffect(() => {
    if (!isFetching && status === "success") {
      setChapter(chapters[0], story);
    }
  }, [location, isFetching]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <StyledStory>
      <StoryCard story={story} progress={progress} />
      <div className="story-info">
        <div className="author">
          <ProfilePicture
            filename={story.author?._id}
            width="30px"
            height="30px"
          />
          <span className="username">{story?.author?.name}</span>
        </div>
        <div className="status">Ongoing</div>
        <div className="desc">{story?.description}</div>
      </div>
      <div className="table-contents">
        <h2>Table of Contents</h2>
        <ul>
          {story?.chapters?.map((chapter) => {
            return <li key={chapter._id}>{chapter.title}</li>;
          })}
        </ul>
      </div>
    </StyledStory>
  );
}

const StoryCard = ({ story, progress }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(story, progress);
    if (progress.chapters) {
      navigate(`/${story._id}/${progress.chapters[0]._id}`);
    }
  };
  return (
    <div className="story-card">
      <div className="cover">
        <Cover filename={story._id} width="184px" height="250px" />
      </div>
      <div className="info">
        <h3>{story.title}</h3>

        <div className="stats">
          <div className="item">
            <div className="label">
              <GoEye />
              Reads
            </div>
            <div className="value">88.8K</div>
          </div>
          <div className="item">
            <div className="label">
              <BsFillStarFill />
              Votes
            </div>
            <div className="value">1,1K</div>
          </div>
          <div className="item">
            <div className="label">
              <AiOutlineBars />
              Parts
            </div>
            <div className="value">10</div>
          </div>
        </div>
        <button onClick={handleClick}>Start Reading</button>
      </div>
    </div>
  );
};

export default Story;
