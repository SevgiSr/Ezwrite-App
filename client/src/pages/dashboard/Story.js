import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { StoryContext } from "../../context/storyContext";
import StyledStory from "./styles/Story.styled";
import Cover from "../../components/Cover";
import ProfilePicture from "../../components/ProfilePicture";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { AiFillDislike, AiOutlineBars } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import Respond from "../../components/Respond";
import { UserContext } from "../../context/userContext";
import { Conversation, Tag } from "../../components";

function Story() {
  const {
    state,
    getStory,
    getProgress,
    setChapter,
    useAddStoryConv,
    useAddConvComment,
    useDeleteStoryConv,
    useDeleteConvComment,
  } = useContext(StoryContext);
  const { userState } = useContext(UserContext);
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

  useEffect(() => {
    if (!isFetching && status === "success") {
      const { chapters, story } = progress;
      setChapter(chapters[0], story);
    }
  }, [location, isFetching]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!state.story || !state.chapter) return null;

  return (
    <StyledStory>
      <header>
        <StoryCard progress={progress} />
      </header>
      <main>
        <section className="info-section">
          <div className="story-info">
            <div className="author">
              <ProfilePicture
                filename={state.story.author?._id}
                width="30px"
                height="30px"
              />
              <span className="username">{state.story?.author?.name}</span>
            </div>
            <div className="status">Ongoing</div>
            <div className="desc">{state.story?.description}</div>
            <div className="tags">
              {state.story.tags?.map((tag) => {
                return <Tag tag={tag} key={tag._id} />;
              })}
            </div>
          </div>
          <div className="table-contents">
            <h2>Table of Contents</h2>
            <ul>
              {state.story?.chapters?.map((chapter) => {
                return (
                  <li key={chapter._id}>
                    <Link to={`/${state.story._id}/${chapter._id}`}>
                      {chapter.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="comments-section">
          <div className="comments">
            <Respond
              id={story_id}
              text={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title}`}
              activity={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title}`}
              sender={userState.user._id}
              location={story_id}
              route={location.pathname}
              dest={story_id}
              to={state.story.author?.name}
              useAddConv={useAddStoryConv}
            />
            <div className="column-reverse">
              {state.story.comments?.map((comment) => {
                return (
                  <div key={comment._id} className="comment">
                    <Conversation
                      key={comment._id}
                      conv={comment}
                      dest={state.story._id}
                      location={story_id}
                      useAddConvComment={useAddConvComment}
                      useDeleteConv={useDeleteStoryConv}
                      useDeleteConvComment={useDeleteConvComment}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </StyledStory>
  );
}

const StoryCard = ({ story, progress }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (progress.chapters) {
      navigate(`/${progress.story._id}/${progress.chapters[0]._id}`);
    }
  };
  return (
    <div className="story-card">
      <div className="cover">
        <Cover filename={progress.story._id} width="184px" height="250px" />
      </div>
      <div className="info">
        <div className="flex-row">
          <h3>{progress.story.title}</h3>
          {progress.story.visibility === "draft" && (
            <p className="visibility">DRAFT (Only visible to you)</p>
          )}
        </div>
        <div className="stats">
          <div className="item">
            <div className="label">
              <GoEye />
              Reads
            </div>
            <div className="value">{progress.story.views}</div>
          </div>
          <div className="item">
            <div className="label">
              <BsFillStarFill />
              Votes
            </div>
            <div className="value">{progress.story.votesCount.upvotes}</div>
          </div>
          <div className="item">
            <div className="label">
              <AiFillDislike />
              Downvotes
            </div>
            <div className="value">{progress.story.votesCount.downvotes}</div>
          </div>
          <div className="item">
            <div className="label">
              <AiOutlineBars />
              Parts
            </div>
            <div className="value">{progress.story.chapters.length}</div>
          </div>
        </div>
        <button className="orange-button btn" onClick={handleClick}>
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default Story;
