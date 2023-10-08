import { useQuery } from "@tanstack/react-query";
import StyledMyForks from "./styles/MyForks.styled";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import NavLinks from "../../components/NavLinks";
import { useState } from "react";
import { UserContext } from "../../context/userContext";
import { MdGroup, MdOutlineTimerOff } from "react-icons/md";
import {
  DropdownMenu,
  ModalCenter,
  MyStory,
  StoryCardMini,
  StoryCardRanked,
  UserLine,
  UserLineMini,
} from "../../components";
import { FallingLines } from "react-loader-spinner";
import { FiChevronDown, FiMoreHorizontal } from "react-icons/fi";
import Cover from "../../components/Cover";
import { MyForkContext } from "../../context/myForkContext";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiGitRepoForked } from "react-icons/bi";
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
                    <UserLineMini user={r.author} />
                  </span>
                  's story
                </div>
                <Link className="story" to={`/story/${r._id}`}>
                  <strong>{r.title}</strong>
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
        color="#ff6122"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
}

function MyFork({ fork }) {
  const { useDeleteFork, sendPullRequest } = useContext(MyForkContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPullModalOpen, setIsPullModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const deleteForkMutation = useDeleteFork();
  const handleDeleteClick = () => {
    deleteForkMutation.mutate({ fork_id: fork._id });
  };

  const handlePullClick = () => {
    setIsPullModalOpen(false);
    sendPullRequest(fork._id, title, desc);
  };

  return (
    <div className="my-fork">
      <div className="cover">
        <Cover filename={fork.story._id} width="80px" />
      </div>
      <div className="info">
        <h3 className="story-title">{fork.story.title}</h3>
        <div className="publish-count">3 Taslak</div>
        <div className="update-date">
          <div className="date">Güncellenme Zamanı Oca 27, 2023</div>
          <div className="time">02:38PM</div>
        </div>
        <div className="meta-data"></div>
      </div>
      <div className="buttons">
        <div>
          <button onClick={() => setIsPullModalOpen(true)}>
            Send Updates to Author
          </button>
        </div>
        <div>
          <DropdownMenu
            buttonClass="btn btn-main story-btn"
            menuClass="chapters-dropdown"
            button={
              <>
                <span className="text">Edit Fork</span>
                <span className="down-icon">
                  <FiChevronDown />
                </span>
              </>
            }
            menu={fork.chapters.map((chapter) => {
              return (
                <Link
                  className="dropdown-item"
                  key={chapter._id}
                  to={`/myforks/${fork._id}/${chapter._id}/writing`}
                >
                  <div>
                    {chapter.title}

                    <p>Taslak - Ocak 11, 2023</p>
                  </div>
                </Link>
              );
            })}
          />
        </div>
        <DropdownMenu
          buttonClass="white-button"
          button={
            <span className="icon">
              <FiMoreHorizontal />
            </span>
          }
          menu={
            <div className="dropdown-item flex-row">
              <span className="icon">
                <FaTrashAlt />
              </span>
              <div
                onClick={() => {
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete Fork
              </div>
            </div>
          }
        />
      </div>
      <ModalCenter
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        content={
          <>
            <div className="warning">
              <h2>Are you sure you want to permanently delete your story?</h2>
              Deleting your story is permanent and cannot be undone. If you're
              unsure, it's better to unpublish your story. Unpublished stories
              can only be seen by you, so they don't get any new reads, votes,
              or comments.
            </div>
            <div className="buttons flex-row">
              <button className="btn btn-main" onClick={handleDeleteClick}>
                Delete
              </button>
              <button
                className="btn-grey btn"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        }
      />
      <ModalCenter
        isOpen={isPullModalOpen}
        setIsOpen={setIsPullModalOpen}
        content={
          <>
            <form className="pull-form">
              <label htmlFor="title">Request Title</label>
              <input
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <label htmlFor="desc">Request Description</label>
              <textarea
                id="desc"
                cols="30"
                rows="10"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
              />
            </form>
            <div className="buttons flex-row">
              <button className="btn btn-main" onClick={handlePullClick}>
                Confirm
              </button>
              <button
                className="btn-grey btn"
                onClick={() => {
                  setIsPullModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        }
      />
    </div>
  );
}

export { MyForks, ForkedStories, Pending };
