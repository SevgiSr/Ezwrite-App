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
    getProgress,
    setChapter,
    useAddStoryConv,
    useAddConvComment,
    useDeleteStoryConv,
    useDeleteConvComment,
  } = useContext(StoryContext);
  const { userState } = useContext(UserContext);
  const storyAuthor = state.story.author?.name;
  const mainUser = userState.user.name;

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
      setChapter(story, story.chapters, chapters[0]);
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
              text={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title}</strong>`}
              activity={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title}</strong>`}
              sender={userState.user._id}
              story_id={story_id}
              dest={story_id}
              to={mainUser === storyAuthor ? null : storyAuthor} // if author comments on their own story, notify no one, else notify author
              useAddConv={useAddStoryConv}
            />
            <div className="column-reverse">
              {state.story.comments?.map((comment) => {
                const commentAuthor = comment.author.name;

                //if ure commentator, notify author, if ure author notify commentator if ure both notify nobody
                const toArray = [];
                if (mainUser !== commentAuthor) {
                  toArray.push(commentAuthor);
                }

                if (mainUser !== storyAuthor) {
                  toArray.push(storyAuthor);
                }
                return (
                  <div key={comment._id} className="comment">
                    <Conversation
                      key={comment._id}
                      conv={comment}
                      text={`<strong>${userState.user.name}</strong> responded to <strong>${comment.author.name}</strong>'s comment on <strong>${state.story.title}</strong>`}
                      activity={`<strong>${userState.user.name}</strong> responded to <strong>${comment.author.name}</strong>'s comment on <strong>${state.story.title}</strong>`}
                      story_id={story_id} // this is for changing story's score
                      dest={state.story._id}
                      sendTo={toArray.length === 0 ? null : toArray} //this is for respond that's inside of conv
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
        <button className="btn btn-main" onClick={handleClick}>
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default Story;
