import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyStoryContext } from "../context/myStoryContext";
import StyledMyStory from "./styles/MyStory.styled";
import Cover from "./Cover";
import { FiChevronDown, FiMoreHorizontal } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import DropdownMenu from "./DropdownMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MyStory = ({ story }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setEditStory, deleteStory } = useContext(MyStoryContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  useEffect(() => {
    setTimeout(() => {
      setTimestamp(Date.now());
    }, 10);
  }, []);
  const handleClick = () => {
    navigate(`/${story._id}`);
    setEditStory(story._id);
  };

  const mutation = useMutation((data) => deleteStory(data.story_id), {
    onSuccess: (data, { story_id }) => {
      console.log(story_id);
      const myStories = queryClient.getQueryData(["myStories"]);

      const updatedStories = myStories.filter(
        (story) => story._id !== story_id
      );

      queryClient.setQueryData(["myStories"], updatedStories);

      queryClient.invalidateQueries(["myStories"]);
    },
  });

  const handleDeleteClick = async () => {
    setIsModalOpen(false);
    await mutation.mutateAsync({ story_id: story._id });
  };

  return (
    <StyledMyStory>
      <div className="cover">
        <Cover filename={story._id} width="80px" timestamp={timestamp} />
      </div>
      <div className="info">
        <h3 className="story-title" onClick={handleClick}>
          {story.title}
        </h3>
        <div className="publish-count">3 Taslak</div>
        <div className="update-date">
          <div className="date">Güncellenme Zamanı Oca 27, 2023</div>
          <div className="time">02:38PM</div>
        </div>
        <div className="meta-data"></div>
      </div>
      <div className="buttons">
        <div>
          <DropdownMenu
            buttonClass="orange-button btn story-btn"
            button={
              <>
                <span className="text">Edit Story</span>
                <span className="down-icon">
                  <FiChevronDown />
                </span>
              </>
            }
            menu={story.chapters.map((chapter) => {
              return (
                <Link
                  className="link"
                  key={chapter._id}
                  to={`/${story._id}/${chapter._id}/writing`}
                >
                  <div className="dropdown-item">
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
          menuClass="more-menu"
          button={
            <span className="icon">
              <FiMoreHorizontal />
            </span>
          }
          menu={
            <div className="flex-row">
              <span className="icon">
                <FaTrashAlt />
              </span>
              <button onClick={() => setIsModalOpen(true)}>Delete Story</button>
            </div>
          }
        />
      </div>

      {/* WARNING POP-UP */}

      {isModalOpen && <div className="overlay"></div>}

      <div
        className={"delete-story-modal " + (isModalOpen ? "open-modal" : "")}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="close-modal-btn icon"
        >
          <AiOutlineClose />
        </button>
        <div className="warning">
          <h2>Are you sure you want to permanently delete your story?</h2>
          Deleting your story is permanent and cannot be undone. If you're
          unsure, it's better to unpublish your story. Unpublished stories can
          only be seen by you, so they don't get any new reads, votes, or
          comments.
        </div>
        <div className="buttons flex-row">
          <button className="orange-button btn" onClick={handleDeleteClick}>
            Delete
          </button>
          <button
            className="btn-grey btn"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </StyledMyStory>
  );
};

//learn how to add param routes

export default MyStory;
