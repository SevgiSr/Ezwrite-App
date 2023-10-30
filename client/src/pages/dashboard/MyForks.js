import { useQuery } from "@tanstack/react-query";
import StyledMyForks from "./styles/MyForks.styled";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import NavLinks from "../../components/NavLinks";
import { UserContext } from "../../context/userContext";
import { MdOutlineTimerOff } from "react-icons/md";
import { MyFork, UserLineMini } from "../../components";
import { FallingLines } from "react-loader-spinner";
import { MyForkContext } from "../../context/myForkContext";
import { VscRepoForked } from "react-icons/vsc";

function MyForks() {
  const navigate = useNavigate();
  const location = useLocation();
  const tab = location.pathname.split("/")[3];

  console.log(location.pathname === "/workspace/myForks/");

  return (
    <StyledMyForks>
      <nav>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavLinks
            links={[
              {
                label: "My Forks",
                to: "/workspace/myForks/",
                active: location.pathname === "/workspace/myForks/",
              },
              {
                label: "Pending Fork Requests",
                to: "pending",
                active: tab === "pending",
              },
            ]}
          />
        </div>
        <button className="btn btn-main" onClick={() => navigate("/newStory")}>
          + Create story
        </button>
      </nav>
      <Outlet />
    </StyledMyForks>
  );
}

function ForkedStories() {
  const { getMyForks } = useContext(MyForkContext);
  const { userState } = useContext(UserContext);

  const { data: myForks = [], isLoading } = useQuery(["myForks"], getMyForks, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return null;
  return (
    <div>
      {!isLoading && myForks.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <VscRepoForked />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't forked any stories yet!
          </div>
          <div className="smaller-text">
            A fork of a story, is full copy of original story, both public and
            private chapters. You can obtain fork by collaborating in a story.{" "}
          </div>
        </div>
      ) : (
        <div className="stories-container">
          {isLoading ? (
            <StoriesFallback />
          ) : (
            <>
              {myForks.map((fork) => {
                return (
                  <div key={fork._id} className="my-story">
                    <MyFork fork={fork} />
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

function Pending() {
  const { getPendingForkRequests } = useContext(MyForkContext);
  const { userState } = useContext(UserContext);
  const { data: myPendingRequests = [], isLoading } = useQuery(
    ["pendingForkRequests"],
    getPendingForkRequests,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return null;

  return (
    <div>
      {!isLoading && myPendingRequests.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <MdOutlineTimerOff />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't sent a collaboration request
            yet!
          </div>
          <div className="smaller-text">
            You can send a collaboration request from someone's profile for a
            story. This gives you full copy of the story that you can change
            locally. If you want those changes to be applied in original story
            you have to send pull request to the author.{" "}
          </div>
        </div>
      ) : (
        <div className="pending-forks">
          {myPendingRequests.map((r) => {
            return (
              <div key={r._id} className="pending-fork">
                <div className="collab-icon">
                  <VscRepoForked />
                </div>
                <div className="content">
                  You've requested to collaborate in{" "}
                  <span className="user">
                    <UserLineMini user={r.user} />
                  </span>
                  's story
                </div>
                <Link className="story" to={`/story/${r.story._id}`}>
                  <strong>{r.story.title}</strong>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StoriesFallback() {
  return (
    <div style={{ margin: "5rem 0" }}>
      <FallingLines
        color="var(--accent)"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
}

export { MyForks, ForkedStories, Pending };
