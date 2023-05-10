import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { StoryContext } from "../../context/storyContext";
import StyledChapter from "./styles/Chapter.styled";
import { Conversation } from "../../components";
import Respond from "../../components/Respond";
import { FiChevronDown } from "react-icons/fi";
import Cover from "../../components/Cover";
import { AiFillDislike, AiFillStar } from "react-icons/ai";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { FaComment, FaCommentAlt } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import DropdownMenu from "../../components/DropdownMenu";
import he from "he";

function Chapter() {
  const {
    state,
    incrementViewCount,
    getChapter,
    addChapterConv,
    addConvComment,
  } = useContext(StoryContext);
  const { story_id, chapter_id } = useParams();

  const { userState } = useContext(UserContext);
  const location = useLocation();
  //for incrementing view count
  const [viewTimer, setViewTimer] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("incrementing view");
      incrementViewCount(chapter_id); // Send a request to the backend to increment the view count
    }, 30000); // Change the time interval as needed
    setViewTimer(timer);

    return () => clearTimeout(timer); // Cleanup function to cancel timer on unmount
  }, []);

  //u dont need getChapterConv as it seems!
  useEffect(() => {
    getChapter(story_id, chapter_id);
  }, [location]);

  return (
    <StyledChapter>
      <ChapterHeader story={state.story} />

      <section className="chapter">
        <h1>{state.chapter.title}</h1>
        <div className="metadata">
          <div>
            <div className="icon">
              <GoEye />
            </div>
            <div className="count">{state.chapter.views}</div>
          </div>
          <div>
            <div className="icon">
              <BsFillStarFill />
            </div>
            <div className="count">{state.votes.upvotes}</div>
          </div>
          <div>
            <div className="icon">
              <AiFillDislike />
            </div>
            <div className="count">{state.votes.downvotes}</div>
          </div>

          <div>
            <div className="icon">
              <FaComment />
            </div>
            <div className="count">{state.chapterConvs.length}</div>
          </div>
        </div>
        {state.chapter.paragraphs?.map((paragraph, index) => {
          return (
            <Paragraph
              key={`comments-${index}`}
              paragraph={paragraph}
              index={index}
            />
          );
        })}
      </section>

      <div className="comments">
        <Respond
          id={chapter_id}
          text={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title} - ${state.chapter.title}</strong>`}
          activity={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title} - ${state.chapter.title}</strong>`}
          type="chapter"
          sender={userState.user._id}
          location={state.story._id}
          route={location.pathname}
          dest={chapter_id}
          to={state.author.name}
          addComment={addChapterConv}
        />
        <div className="column-reverse">
          {state.chapterConvs?.map((comment) => {
            return (
              <div key={comment._id}>
                <Conversation conv={comment} addConvComment={addConvComment} />
              </div>
            );
          })}
        </div>
      </div>
    </StyledChapter>
  );
}

function Paragraph({ paragraph, index }) {
  const [openModal, setOpenModal] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const { userState } = useContext(UserContext);
  const location = useLocation();
  const { state, addConvComment, addParagraphConv } = useContext(StoryContext);

  return (
    <div
      className="paragraph"
      onMouseEnter={() => setIsButtonVisible(true)}
      onMouseLeave={() => setIsButtonVisible(false)}
    >
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: he.decode(paragraph.content ? paragraph.content : ""),
        }}
      ></div>
      <button
        className={
          "comment-btn " +
          (paragraph.comments.length > 0
            ? "btn-visible"
            : isButtonVisible
            ? "btn-visible"
            : "")
        }
        onClick={() => setOpenModal(true)}
      >
        <div className="icon">
          <FaCommentAlt />
        </div>
        <div className="count">
          {paragraph.comments.length === 0 ? "+" : paragraph.comments.length}
        </div>
      </button>

      {openModal && (
        <div
          key={"modal-" + paragraph._id}
          className={"comments-modal " + (openModal ? "open-modal" : "")}
        >
          <Respond
            key={"paragraph-" + paragraph._id}
            text={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title} - ${state.chapter.title}</strong>`}
            activity={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title} - ${state.chapter.title}</strong>`}
            type="chapter"
            sender={userState.user._id}
            location={state.story._id}
            route={location.pathname}
            dest={paragraph._id}
            to={state.author.name}
            addComment={addParagraphConv}
          />
          <div className="column-reverse">
            {paragraph.comments?.map((comment) => {
              if (!comment) {
                return null;
              }
              return (
                <div key={"paragraph-" + comment._id}>
                  <Conversation
                    id={comment._id}
                    conv={comment}
                    addConvComment={addConvComment}
                    updatedParagraph={paragraph._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ParagraphComments({ comments, paragraph_id, openModal }) {
  const { userState } = useContext(UserContext);
}

function ChapterHeader() {
  const { state, alertState, voteChapter, unvoteChapter } =
    useContext(StoryContext);
  const [active, setActive] = useState({ upvote: false, downvote: false });
  const handleVoteClick = (e) => {
    voteChapter(state.chapter._id, e.target.name);
  };

  const handleUnvoteClick = (e) => {
    unvoteChapter(state.chapter._id, e.target.name);
  };

  useEffect(() => {
    if (state.myVote === 1) {
      setActive({ downvote: false, upvote: true });
    } else if (state.myVote === -1) {
      setActive({ upvote: false, downvote: true });
    } else {
      setActive({ upvote: false, downvote: false });
    }
  }, [state.myVote]);

  //if it's equals to zero, display nonvoted for both
  //if its == 1 display voted
  //if its == -1 display downwoted

  return (
    <header className="chapter-header">
      <div className="dropdown">
        <StoryDropdown />
      </div>
      <div className="actions">
        <button className="add-list-btn orange-button">+</button>

        <button
          onClick={(e) => {
            if (state.myVote === 1) {
              handleUnvoteClick(e);
            } else {
              handleVoteClick(e);
            }
          }}
          className="vote"
          name={1}
          disabled={alertState.isLoading}
        >
          <div className={`icon active-${String(active.upvote)}`}>
            <AiFillStar />
          </div>
          <div className="text">Vote</div>
        </button>

        <button
          onClick={(e) => {
            if (state.myVote === -1) {
              handleUnvoteClick(e);
            } else {
              handleVoteClick(e);
            }
          }}
          className="vote"
          name={-1}
          disabled={alertState.isLoading}
        >
          <div className={`icon active-${String(active.downvote)}`}>
            <AiFillDislike />
          </div>
          <div className="text">Downvote</div>
        </button>
      </div>
    </header>
  );
}

function StoryDropdown() {
  const { state } = useContext(StoryContext);

  return (
    <>
      <DropdownMenu
        buttonClass="story-dropdown-btn"
        button={
          <>
            <div className="story-card">
              <Cover width="30px" filename={state.story._id} />
              <div className="info">
                <span className="title">{state.story.title}</span>
                <span className="author">by {state.story?.author?.name}</span>
              </div>
            </div>
            <span className="down-icon">
              <FiChevronDown />
            </span>
          </>
        }
        menu={
          <>
            <div>Table of contents</div>
            {state.story.chapters?.map((chapter) => {
              return (
                <div
                  key={chapter._id}
                  className={
                    `dropdown-item ` +
                    (chapter._id === state.chapter._id && `active`)
                  }
                >
                  <Link
                    className="link"
                    to={`/${state.story._id}/${chapter._id}`}
                  >
                    <div>{chapter.title}</div>
                  </Link>
                </div>
              );
            })}
          </>
        }
      />
    </>
  );
}

export default Chapter;
