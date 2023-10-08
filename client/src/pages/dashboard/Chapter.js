import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { StoryContext } from "../../context/storyContext";
import StyledChapter from "./styles/Chapter.styled";
import { Conversation } from "../../components";
import Respond from "../../components/Respond";
import { FiChevronDown } from "react-icons/fi";
import Cover from "../../components/Cover";
import {
  AiFillDislike,
  AiFillStar,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { FaComment, FaCommentAlt } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
import DropdownMenu from "../../components/DropdownMenu";
import he from "he";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader, SyncLoader } from "react-spinners";
import { ForkContext } from "../../context/forkContext";

function Chapter() {
  const {
    state,
    incrementViewCount,
    useAddChapterConv,
    useDeleteChapterConv,
    useAddConvComment,
    useDeleteConvComment,
    useSetCurrentChapter,
    useSetProgress,
    getProgress,
    setChapter,
  } = useContext(StoryContext);
  const {
    useAddForkChapterConv,
    useDeleteForkChapterConv,
    useAddForkConvComment,
    useDeleteForkConvComment,
    getFork,
  } = useContext(ForkContext);

  const { story_id, fork_id, chapter_id } = useParams();
  const location = useLocation();
  const isFork = location.pathname.split("/")[1] === "fork";

  const { userState } = useContext(UserContext);
  //for incrementing view count
  const [viewTimer, setViewTimer] = useState(null);
  const scrollRef = useRef(null);

  const {
    data: { chapters, story, user } = {},
    isLoading,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["progress", story_id],
    queryFn: () => getProgress(story_id),
    refetchOnWindowFocus: false,
    enabled: !isFork,
  });

  const {
    data: fork = {},
    isLoading: isForkLoading,
    isFetching: isForkFetching,
    status: forkStatus,
  } = useQuery({
    queryKey: ["fork", fork_id],
    queryFn: () => getFork(fork_id),
    refetchOnWindowFocus: false,
    enabled: isFork,
  });

  console.log(status, forkStatus, isLoading, isForkLoading);

  const setProgressMutation = useSetProgress();
  const setCurrentChapterMutation = useSetCurrentChapter();

  //if location changes, before doing refetch checks the cache and retrieves chapter instantly
  //if fetching happens(you mount page for the first time, refresh, mutation) it waits for fetching to end for a few seconds and updates
  // order of dependency array does not matter
  //it updates progress only if chapter is not in the progress. and it always navigates you to the first progress not where you was left last time

  useEffect(() => {
    return () => {
      if (!isFork) {
        console.log("SAVING PROGRESS.....");
        setCurrentChapterMutation.mutate({ story_id, chapter_id });
        console.log("saved progress");
      }
    };
  }, []);

  useEffect(() => {
    if (!isFork) {
      if (!isFetching && status === "success") {
        const currentChapter = chapters.find(
          (chapter) => chapter._id === chapter_id
        );
        if (currentChapter) {
          console.log("accessing");
          setChapter(story, story.chapters, currentChapter);
        } else {
          console.log("mutating");
          setProgressMutation.mutate({ story_id, chapter_id });
        }
      }
    }
  }, [location, isFetching]);

  useEffect(() => {
    if (isFork) {
      if (!isForkFetching && forkStatus === "success") {
        const currentChapter = fork.chapters.find(
          (chapter) => chapter._id === chapter_id
        );
        if (currentChapter) {
          setChapter(fork.story, fork.chapters, currentChapter);
        }
      }
    }
  }, [location, isForkFetching]);

  useEffect(() => {
    if (!isFork) {
      const timer = setTimeout(() => {
        console.log("incrementing view");
        incrementViewCount(story_id, chapter_id); // Send a request to the backend to increment the view count
      }, 30000); // Change the time interval as needed
      setViewTimer(timer);

      return () => clearTimeout(timer); // Cleanup function to cancel timer on unmount
    }
  }, []);

  if ((!isFork && isLoading) || (isFork && isForkLoading)) {
    return <h1>loading...</h1>;
  }

  return (
    <StyledChapter ref={scrollRef}>
      <ChapterHeader
        isChapterLoading={setProgressMutation.isLoading}
        scrollRef={scrollRef}
        user={user}
      />

      <section className="chapter">
        <div className="flex-row">
          <h1>{state.chapter.title}</h1>
          {state.chapter.visibility === "draft" && (
            <p className="visibility">{"(DRAFT)"}</p>
          )}
        </div>
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
            <div className="count">{state.chapter.comments?.length}</div>
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

      <section className="comments-section">
        <div className="respond-component">
          <Respond
            id={chapter_id}
            text={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title} - ${state.chapter.title}</strong>`}
            activity={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title} - ${state.chapter.title}</strong>`}
            sender={userState.user._id}
            location={isFork ? fork_id : story_id}
            route={location.pathname}
            dest={chapter_id}
            to={state.story.author?.name}
            useAddConv={isFork ? useAddForkChapterConv : useAddChapterConv}
          />
        </div>
        <div className="column-reverse">
          {state.chapter.comments?.map((comment) => {
            return (
              <div key={comment._id}>
                <Conversation
                  conv={comment}
                  dest={state.chapter._id}
                  location={state.story._id}
                  useAddConvComment={
                    isFork ? useAddForkConvComment : useAddConvComment
                  }
                  useDeleteConv={
                    isFork ? useDeleteForkChapterConv : useDeleteChapterConv
                  }
                  useDeleteConvComment={
                    isFork ? useDeleteForkConvComment : useDeleteConvComment
                  }
                />
              </div>
            );
          })}
        </div>
      </section>
    </StyledChapter>
  );
}

function Paragraph({ paragraph, index }) {
  const [openModal, setOpenModal] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const { userState } = useContext(UserContext);
  const location = useLocation();
  const { story_id, fork_id } = useParams();
  const isFork = location.pathname.split("/")[1] === "fork";

  const {
    state,
    useAddConvComment,
    useDeleteConvComment,
    useAddParagraphConv,
    useDeleteParagraphConv,
  } = useContext(StoryContext);

  const {
    useAddForkConvComment,
    useDeleteForkConvComment,
    useAddForkParagraphConv,
    useDeleteForkParagraphConv,
  } = useContext(ForkContext);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = paragraph.content;
    }
  }, [paragraph]);

  const listener = (e) => {
    if (
      e.target !== buttonRef.current &&
      !modalRef.current?.contains(e.target)
    ) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <div
      className="paragraph"
      onMouseEnter={() => setIsButtonVisible(true)}
      onMouseLeave={() => setIsButtonVisible(false)}
    >
      <div ref={contentRef} className="content"></div>
      <button
        ref={buttonRef}
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
          ref={modalRef}
          key={"modal-" + paragraph._id}
          className={"comments-modal " + (openModal ? "open-modal" : "")}
        >
          <Respond
            key={"paragraph-" + paragraph._id}
            text={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title} - ${state.chapter.title}</strong>`}
            activity={`<strong>${userState.user.name}</strong> commented on <strong>${state.story.title} - ${state.chapter.title}</strong>`}
            type="story"
            sender={userState.user._id}
            location={isFork ? fork_id : story_id}
            route={location.pathname}
            dest={paragraph._id}
            to={state.story.author.name}
            useAddConv={isFork ? useAddForkParagraphConv : useAddParagraphConv}
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
                    dest={paragraph._id}
                    location={state.story._id}
                    useAddConvComment={
                      isFork ? useAddForkConvComment : useAddConvComment
                    }
                    useDeleteConv={
                      isFork
                        ? useDeleteForkParagraphConv
                        : useDeleteParagraphConv
                    }
                    useDeleteConvComment={
                      isFork ? useDeleteForkConvComment : useDeleteConvComment
                    }
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

function ChapterHeader({ isChapterLoading, user }) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const isFork = location.pathname.split("/")[1] === "fork";

  const {
    state,
    alertState,
    voteChapter,
    unvoteChapter,
    useAddToList,
    useCreateList,
  } = useContext(StoryContext);

  const createListMutation = useCreateList();
  const addToListMutation = useAddToList();

  const [title, setTitle] = useState("");

  const [active, setActive] = useState({ upvote: false, downvote: false });

  const [scrollProgress, setScrollProgress] = useState(0);

  const [mutatedListId, setMutatedListId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const totalScrollableDistance = scrollHeight - clientHeight;
      const progress = (scrollTop / totalScrollableDistance) * 100;
      setScrollProgress(progress);
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //update UI immediately with dispatch and make backend request
  const voteMutation = useMutation(
    (data) => voteChapter(data.story_id, data.chapter_id, data.name),
    {
      onSuccess: () => {
        //change cache too so that the vote is consistent everywhere
        queryClient.invalidateQueries(["progress"]);
        queryClient.invalidateQueries(["fork"]);
      },
    }
  );

  const unvoteMutation = useMutation(
    (data) => unvoteChapter(data.story_id, data.chapter_id, data.name),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["progress"]);
        queryClient.invalidateQueries(["fork"]);
      },
    }
  );

  //I needed to mutate cache instead of just changing chapter global state
  //because when user navigates back they still need to see their vote
  const handleVoteClick = (e) => {
    voteMutation.mutate({
      story_id: state.story._id,
      chapter_id: state.chapter._id,
      name: e.target.name,
    });
  };

  const handleUnvoteClick = (e) => {
    unvoteMutation.mutate({
      story_id: state.story._id,
      chapter_id: state.chapter._id,
      name: e.target.name,
    });
  };

  useEffect(() => {
    if (state.myVote === 1) {
      setActive({ downvote: false, upvote: true });
    } else if (state.myVote === -1) {
      setActive({ upvote: false, downvote: true });
    } else {
      setActive({ upvote: false, downvote: false });
    }
  }, [state]);

  //if it's equals to zero, display nonvoted for both
  //if its == 1 display voted
  //if its == -1 display downwoted

  const handleAddToList = (list_id) => {
    setMutatedListId(list_id);
    addToListMutation.mutate({
      list_id: list_id,
      story_id: state.story._id,
    });
  };

  const handleCreateList = (title) => {
    if (title !== "") {
      createListMutation.mutate({ title, story_id: state.story._id });
    }
  };

  return (
    <header className="chapter-header">
      <div className="dropdown">
        <StoryDropdown />
      </div>
      <div className="actions">
        {isChapterLoading && (
          <div style={{ marginRight: "15px" }}>
            <ClipLoader size={15} color="#fff" />
          </div>
        )}

        {!isFork && (
          <DropdownMenu
            buttonClass="btn btn-main add-list-btn"
            menuClass="add-list-menu"
            button={<span>+</span>}
            menu={
              <>
                <div className="title">Reading Lists</div>
                {user.readingLists?.map((readingList) => {
                  return (
                    <div key={readingList._id} className="dropdown-item">
                      <button
                        className="reading-list"
                        onClick={() => handleAddToList(readingList._id)}
                      >
                        <div>{readingList.title}</div>
                      </button>
                      <div className="icon">
                        {mutatedListId === readingList._id &&
                          addToListMutation.isLoading && (
                            <ClipLoader size={18} color="rgb(0, 178, 178)" />
                          )}
                        {mutatedListId === readingList._id &&
                          addToListMutation.status === "success" && (
                            <AiOutlineCheckCircle
                              size={20}
                              color="rgb(0, 178, 178)"
                            />
                          )}
                      </div>
                    </div>
                  );
                })}
                <div className="new-reading-list">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Add new reading list..."
                  />
                  <button
                    onClick={() => handleCreateList(title)}
                    className="btn btn-main"
                  >
                    {createListMutation.isLoading ? (
                      <ClipLoader size={13} color="#fff" />
                    ) : (
                      <span>+</span>
                    )}
                  </button>
                </div>
              </>
            }
          />
        )}

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

      <div className="progress">
        <div
          style={{
            width: `${scrollProgress}%`,
            height: "5px",
            backgroundColor: "#00b2b2",
          }}
        ></div>
      </div>
    </header>
  );
}

function StoryDropdown() {
  const { state } = useContext(StoryContext);
  const location = useLocation();
  const isFork = location.pathname.split("/")[1] === "fork";
  const { fork_id, story_id } = useParams();

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
            {state.chapters?.map((chapter) => {
              return (
                <Link
                  className="link"
                  key={chapter._id}
                  to={
                    (isFork ? `/fork/${fork_id}` : `/${story_id}`) +
                    `/${chapter._id}`
                  }
                >
                  <div
                    className={
                      `dropdown-item ` +
                      (chapter._id === state.chapter._id && `active`)
                    }
                  >
                    <div>{chapter.title}</div>
                  </div>
                </Link>
              );
            })}
          </>
        }
      />
    </>
  );
}

export default Chapter;
