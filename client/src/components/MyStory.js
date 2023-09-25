import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyStoryContext } from "../context/myStoryContext";
import StyledMyStory from "./styles/MyStory.styled";
import Cover from "./Cover";
import { FiChevronDown, FiMoreHorizontal } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import DropdownMenu from "./DropdownMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ModalCenter from "./ModalCenter";
import getDate from "../utils/getDate.js";

const MyStory = ({ story }) => {
  const navigate = useNavigate();
  const { setEditStory, useDeleteStory } = useContext(MyStoryContext);

  const deleteStoryMutation = useDeleteStory();
  // this state should be in each individual story
  //if it was in myStories then all stories would have the same state
  //and if you would open modal it would be true for all of them
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [timestamp, setTimestamp] = useState(Date.now());
  useEffect(() => {
    setTimeout(() => {
      setTimestamp(Date.now());
    }, 10);
  }, []);

  const handleDeleteClick = () => {
    setIsModalOpen(false);
    console.log("deleting");
    console.log(story.title);
    deleteStoryMutation.mutate({ story_id: story._id });
  };

  return (
    <StyledMyStory>
      <Link className="cover" to={`/manage/${story._id}`}>
        <Cover filename={story._id} width="80px" timestamp={timestamp} />
      </Link>

      <div className="info">
        <Link className="story-title" to={`/manage/${story._id}`}>
          {story.title}
        </Link>
        <div className="publish-count">3 Taslak</div>
        <div className="update-date">
          <div className="date">Updated - {getDate(story.updatedAt)}</div>
        </div>
        <div className="meta-data"></div>
      </div>
      <div className="buttons">
        <div>
          <DropdownMenu
            buttonClass="orange-button btn edit-chapters-btn"
            menuClass="chapters-dropdown"
            button={
              <>
                <span className="text">Edit Chapters</span>
                <span className="down-icon">
                  <FiChevronDown />
                </span>
              </>
            }
            menu={story.chapters.map((chapter) => {
              return (
                <Link
                  className="dropdown-item"
                  key={chapter._id}
                  to={`/myworks/${story._id}/${chapter._id}/writing`}
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
                  setIsModalOpen(true);
                }}
              >
                Delete Story
              </div>
            </div>
          }
        />
      </div>

      <ModalCenter
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        content={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="close-modal-btn icon"
            >
              <AiOutlineClose />
            </button>
            <div className="warning">
              <h2>Are you sure you want to permanently delete your story?</h2>
              Deleting your story is permanent and cannot be undone. If you're
              unsure, it's better to unpublish your story. Unpublished stories
              can only be seen by you, so they don't get any new reads, votes,
              or comments.
            </div>
            <div className="buttons flex-row">
              <button className="orange-button btn" onClick={handleDeleteClick}>
                Delete
              </button>
              <button
                className="btn-grey btn"
                onClick={() => {
                  console.log(story.title);
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        }
      />
    </StyledMyStory>
  );
};

//learn how to add param routes

export default MyStory;
