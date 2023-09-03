import { useEffect, useState, Suspense } from "react";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import { MyStory, Story, UserLine } from "../../components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import StyledMyStories from "./styles/MyStories.styled";
import { ImBooks } from "react-icons/im";
import { UserContext } from "../../context/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColorRing, Dna, FallingLines } from "react-loader-spinner";
import OrangeLinks from "../../components/OrangeLinks";
import { MyForkContext } from "../../context/myForkContext";

function MyStories({ show }) {
  const navigate = useNavigate();
  const { storyState, getMyStories, mutationState, getMyForks } =
    useContext(MyStoryContext);
  const { userState } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("stories");

  //staleTime is infitiy so that is stays fresh until mutation
  //because this data will not be updated unless user updated it himself
  //now it does not have to make backend request each time this component is rendered
  //and it will not make slow backend requests when user navigates between stories
  const { data: myStories = [], isLoading } = useQuery(
    ["myStories"],
    getMyStories,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  return (
    <StyledMyStories>
      <nav>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OrangeLinks
            links={[
              {
                label: "My Stories",
                handleClick: () => setActiveTab("stories"),
              },
              {
                label: "Collaboration Requests",
                handleClick: () => setActiveTab("collabs"),
              },
              {
                label: "Pull Requests",
                handleClick: () => setActiveTab("pulls"),
              },
            ]}
          />
          {mutationState.isLoading && (
            <div className="header-loader">
              <Dna
                visible={true}
                height="50"
                width="50"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
              <span>Loading...</span>
            </div>
          )}
        </div>
        <button
          className="btn orange-button"
          onClick={() => navigate("/newStory")}
        >
          + Create story
        </button>
      </nav>
      {activeTab === "stories" && (
        <Stories myStories={myStories} isLoading={isLoading} />
      )}
      {activeTab === "collabs" && <Collabs />}
      {activeTab === "pulls" && <Pulls />}
    </StyledMyStories>
  );
}

function Stories({ myStories, isLoading }) {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div>
      {!isLoading && myStories.length === 0 ? (
        <div className="no-stories">
          <div className="icon">
            <ImBooks />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't written any stories yet.
          </div>
          <button
            className="btn orange-button"
            onClick={() => navigate("/newStory")}
          >
            + Create story
          </button>
        </div>
      ) : (
        <div className="stories-container">
          {isLoading ? (
            <StoriesFallback />
          ) : (
            <>
              {myStories.map((story) => {
                return (
                  <div key={story._id} className="my-story">
                    <MyStory key={story._id} story={story} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Collabs() {
  const { getCollabRequests, grantCollaboratorAccess } =
    useContext(MyStoryContext);

  const { data: collabRequests = [], isLoading } = useQuery(
    ["collabRequests"],
    getCollabRequests,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleAcceptRequestClick = (r) => {
    grantCollaboratorAccess(r.story._id, r.user._id);
  };

  if (isLoading) return null;

  return (
    <div className="collab-requests">
      {collabRequests.map((c) => {
        return (
          <div key={c._id}>
            <div>{c.story.title}</div>
            <button onClick={() => handleAcceptRequestClick(c)}>
              Accept Request
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Pulls() {
  const { getPullRequests, mergeFork } = useContext(MyStoryContext);
  const navigate = useNavigate();
  const { data: pullRequests = [], isLoading } = useQuery(
    ["pullRequests"],
    getPullRequests,
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleMergeChanges = async (fork) => {
    await mergeFork(fork._id);
    navigate(`/myworks/${fork.story._id}/${fork.story.chapters[0]}/writing`);
  };

  if (isLoading) return null;

  return (
    <div className="pull-requests">
      {pullRequests.map((p) => {
        return (
          <div key={p._id}>
            <UserLine user={p.collaborator} />
            <span>wants to propose these changes to you story</span>
            <Story story={p.story} />
            <button onClick={() => handleMergeChanges(p)}>Merge Changes</button>
          </div>
        );
      })}
    </div>
  );
}

function StoriesFallback() {
  return (
    <div style={{ margin: "5rem 0" }}>
      <FallingLines
        color="#ff6122"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
}

export default MyStories;
