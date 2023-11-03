import { useContext } from "react";
import { MyForkContext } from "../context/myForkContext";
import { useState } from "react";
import Cover from "./Cover";
import DropdownMenu from "./DropdownMenu";
import { FiChevronDown, FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import ModalCenter from "./ModalCenter";
import StyledMyFork from "./styles/MyFork.styled";
import getDate from "../utils/getDate";
import { VscGitMerge } from "react-icons/vsc";

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
    <StyledMyFork>
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
          <button
            className="btn btn-basic send-btn"
            onClick={() => setIsPullModalOpen(true)}
          >
            <div className="icon">
              <VscGitMerge />
            </div>
            <div className="text">Send Updates to Author</div>
          </button>
        </div>
        <div>
          <DropdownMenu
            buttonClass="btn btn-main edit-chapters-btn"
            menuClass="chapters-dropdown"
            button={
              <>
                <span className="text">Edit Chapters</span>
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

                    <p>{getDate(chapter.updatedAt)}</p>
                  </div>
                </Link>
              );
            })}
          />
        </div>
        <DropdownMenu
          buttonClass="btn btn-basic btn-delete"
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
              <h2>Are you sure you want to permanently delete your fork?</h2>
              Deleting your fork is permanent and cannot be undone. You'll lose
              your access to original story.
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
            <header>
              <h1>Send Updates To Author</h1>
            </header>
            <form className="pull-form">
              <div className="form-item">
                <label htmlFor="title">Request Title</label>
                <input
                  id="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="form-item">
                <label htmlFor="desc">Request Description</label>
                <textarea
                  id="desc"
                  cols="30"
                  rows="10"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
              </div>
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
    </StyledMyFork>
  );
}

export default MyFork;
