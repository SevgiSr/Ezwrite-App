import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Cover, UserLine } from "../../components";
import StyledManageStory from "./styles/ManageStory.styled";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import OrangeLinks from "../../components/OrangeLinks";
import { MdOutlineGroupOff } from "react-icons/md";
import { UserContext } from "../../context/userContext";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiGitPullRequest } from "react-icons/bi";
import { ImFilesEmpty } from "react-icons/im";

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
    staleTime: Infinity,
  });

  //right after getting it from the cache update global myStory state to use
  useEffect(() => {
    if (!isFetching && status === "success") {
      const myStory = myStories.find((story) => story._id === story_id);
      setMyStory(myStory);
    }
  }, [location, isFetching]);

  if (isLoading || !story) return null;

  return (
    <StyledManageStory>
      <div className="info">
        <Cover filename={story._id} width="130px" />
        <div className="title">{story.title}</div>
        <Link to={`/${story._id}`}>Edit Story Details</Link>
      </div>

      <div className="main">
        <OrangeLinks
          links={[
            { to: "", label: "Chapters" },
            { to: "pull-requests/", label: "Pull Requests" },
            { to: "collab-requests/", label: "Collab Requests" },
            { to: "merge-history/", label: "Merge History" },
          ]}
        />
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
      {story.pullRequests?.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <ImFilesEmpty />
          </div>
          <div className="text">This story doesn't have any chapters.</div>
        </div>
      ) : (
        <div className="chapters">
          {story.chapters?.map((chapter) => {
            return <div className="chapter">{chapter.title}</div>;
          })}
        </div>
      )}
    </div>
  );
}

function ManagePulls() {
  const { storyState, mergeFork } = useContext(MyStoryContext);
  const { story } = storyState;
  const { userState } = useContext(UserContext);

  const navigate = useNavigate();
  const handleMergeChanges = async (fork) => {
    await mergeFork(fork._id);
    navigate(`/myworks/${fork.story._id}/${fork.story.chapters[0]}/writing`);
  };

  return (
    <div className="pulls-container">
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
              <div className="pull-request">
                <div className="pull-title">{p.title}</div>
                <div className="pull-desc">{p.description}</div>
                <div className="fork">
                  <button onClick={() => handleMergeChanges(p.fork)}>
                    Merge Changes
                  </button>
                  <Link to={`/fork/${p.fork._id}/${p.fork.chapters[0]._id}`}>
                    Preview
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ManageCollabs() {
  const { storyState, grantCollaboratorAccess } = useContext(MyStoryContext);
  const { userState } = useContext(UserContext);
  const { story } = storyState;

  const handleAcceptRequestClick = (collab) => {
    grantCollaboratorAccess(story._id, collab._id);
  };

  return (
    <div className="collabs-container">
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
              <div className="collab">
                <UserLine user={collab} />
                wants to collaborate in this story.
                <button onClick={() => handleAcceptRequestClick(collab)}>
                  Accept Request
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ManageHistory() {
  const { storyState } = useContext(MyStoryContext);
  const { userState } = useContext(UserContext);
  const { story } = storyState;

  return (
    <div className="history-container">
      {story.forkHistory?.length === 0 ? (
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
          {story.forkHistory.map((h) => {
            return <div className="history-record">{h}</div>;
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
