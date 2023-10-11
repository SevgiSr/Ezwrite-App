import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Alert, CollabRequest, Cover, PullRequest } from "../../components";
import StyledManageStory from "./styles/ManageStory.styled";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import NavLinks from "../../components/NavLinks";
import { MdOutlineGroupOff } from "react-icons/md";
import { UserContext } from "../../context/userContext";
import { AiOutlineFieldTime, AiOutlineInfoCircle } from "react-icons/ai";
import { BiEditAlt, BiGitPullRequest } from "react-icons/bi";
import { ImFilesEmpty } from "react-icons/im";
import getDate from "../../utils/getDate";
import { RxCounterClockwiseClock } from "react-icons/rx";

function ManageStory() {
  const { story_id } = useParams();
  const location = useLocation();
  const { getMyStories, setMyStory, storyState } = useContext(MyStoryContext);
  const { story } = storyState;

  const {
    data: myStories = [],
    isLoading,
    isFetching,
    status,
  } = useQuery(["myStories"], getMyStories, {
    refetchOnWindowFocus: false,
  });

  //right after getting it from the cache update global myStory state to use
  useEffect(() => {
    if (!isFetching && status === "success") {
      console.log("UPDATING STORY ON UI");
      const myStory = myStories.find((story) => story._id === story_id);
      setMyStory(myStory);
    }
  }, [location, isFetching, status]);

  if (isLoading || !story) return null;

  return (
    <StyledManageStory>
      <div className="info">
        <Cover filename={story._id} width="210px" />
        <div className="story-title">{story.title}</div>
        <Link className="btn btn-link edit-story-btn" to={`/${story._id}`}>
          <div className="icon">
            <AiOutlineInfoCircle />
          </div>
          Edit Story Details
        </Link>
      </div>

      <div className="main">
        <div className="story-nav">
          <NavLinks
            links={[
              { to: "", label: "Chapters" },
              { to: "pull-requests/", label: "Pull Requests" },
              { to: "collab-requests/", label: "Collab Requests" },
              { to: "merge-history/", label: "Merge History" },
            ]}
          />
        </div>
        <Outlet />
      </div>
    </StyledManageStory>
  );
}

function ManageChapters() {
  const { storyState } = useContext(MyStoryContext);
  const { userState } = useContext(UserContext);

  const { story } = storyState;
  return (
    <div className="chapters-container">
      {story.chapters?.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <ImFilesEmpty />
          </div>
          <div className="text">This story doesn't have any chapters.</div>
        </div>
      ) : (
        <div className="chapters">
          {story.chapters?.map((chapter) => {
            return (
              <Link
                to={`/myworks/${story._id}/${chapter._id}/writing`}
                className="chapter"
                key={chapter._id}
              >
                <header>
                  <div className="title">{chapter.title}</div>
                  <div className="status">{chapter.visibility}</div>
                </header>
                <div className="updated">
                  Updated - {getDate(chapter.updatedAt)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ManagePulls() {
  const { storyState, alertState } = useContext(MyStoryContext);
  const { story } = storyState;
  const { userState } = useContext(UserContext);

  if (!story) return null;

  return (
    <div className="pulls-container">
      <Alert state={alertState} />
      {story.pullRequests?.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <BiGitPullRequest />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't got any pull requests yet.
          </div>
        </div>
      ) : (
        <div className="pull-requests">
          {story.pullRequests?.map((p) => {
            return (
              <div className="pull-request" key={p._id}>
                <PullRequest pull={p} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ManageCollabs() {
  const { storyState, alertState } = useContext(MyStoryContext);
  const { userState } = useContext(UserContext);
  const { story } = storyState;

  if (!story) return null;

  return (
    <div className="collabs-container">
      <Alert state={alertState} />
      {story.collabRequests?.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <MdOutlineGroupOff />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't got any collaboration
            requests yet.
          </div>
        </div>
      ) : (
        <div className="collab-requests">
          {story.collabRequests?.map((collab) => {
            return (
              <div className="collab" key={collab._id}>
                <CollabRequest collab={collab} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ManageHistory() {
  const { storyState, useRestoreMergeHistory, alertState } =
    useContext(MyStoryContext);
  const { userState } = useContext(UserContext);
  const { story } = storyState;

  const restoreMergeHistoryMutation = useRestoreMergeHistory();

  const handleRestoreClick = (history_id) => {
    restoreMergeHistoryMutation.mutate({ history_id });
  };

  if (!story) return null;

  return (
    <div className="history-container">
      <Alert state={alertState} />
      {story.mergeHistory?.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <AiOutlineFieldTime />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't made any merges yet!
          </div>
        </div>
      ) : (
        <div className="history">
          {story.mergeHistory?.map((h) => {
            return (
              <div className="history-record" key={h._id}>
                <div className="history-date">{getDate(h.createdAt)}</div>
                <button
                  className="btn btn-basic revert-btn"
                  type="button"
                  onClick={() => handleRestoreClick(h._id)}
                >
                  <div className="icon">
                    <RxCounterClockwiseClock />
                  </div>
                  Revert Changes
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export {
  ManageStory,
  ManageChapters,
  ManagePulls,
  ManageHistory,
  ManageCollabs,
};
