//read from database
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import StyledStoryNavbar from "./styles/StoryNavbar.styled";
import { ClipLoader } from "react-spinners";
import Cover from "./Cover";
import { FiChevronDown } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiMoreFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const Navbar = () => {
  const {
    storyState,
    useAddChapter,
    mutationState,
    useDeleteChapter,
    usePublishChapter,
    useUnpublishChapter,
  } = useContext(MyStoryContext);
  const navigate = useNavigate();
  const { story_id, chapter_id } = useParams();

  const addChapterMutation = useAddChapter();
  const deleteChapterMutation = useDeleteChapter();
  const publishChapterMutation = usePublishChapter();
  const unpublishChapterMutation = useUnpublishChapter();

  const handleNewPartClick = async () => {
    const { chapter_id, story_id } = await addChapterMutation.mutateAsync({
      story_id: storyState.story._id,
    });

    navigate(`/${story_id}/${chapter_id}/writing`);
  };

  //YOU HAVE TO
  //if you want to navigate only after mutation ended:
  const handleDeleteClick = async () => {
    await deleteChapterMutation.mutateAsync({ story_id, chapter_id });
    navigate(`/${story_id}`);
  };

  const handlePublishClick = () => {
    console.log("publishing");
    publishChapterMutation.mutate({ story_id, chapter_id });
  };

  const handleUnpublishClick = () => {
    unpublishChapterMutation.mutate({ story_id, chapter_id });
  };

  if (!storyState.story) return null;
  if (!storyState.chapter) return null;
  return (
    <StyledStoryNavbar>
      <nav className="navbarContainer">
        <section className="story-section">
          <Link to="/myStories" className="back-btn">
            <div className="icon">
              <IoIosArrowBack />
            </div>
          </Link>

          <DropdownMenu
            buttonClass="write-dropdown-btn"
            menuClass="write-dropdown-menu"
            button={
              <div className="story-card">
                <Cover width="40px" filename={storyState.story._id} />
                <div className="story-info">
                  <p className="story-title">
                    <span>{storyState.story.title}</span>
                    <span className="icon">
                      <FiChevronDown />
                    </span>
                  </p>
                  <h4 className="chapter-title">{storyState.chapter.title}</h4>
                  <p className="update-info">
                    {storyState.chapter.visibility?.toUpperCase()}{" "}
                    <span>(Saved)</span>
                  </p>
                </div>
              </div>
            }
            menu={
              <>
                {storyState.story.chapters?.map((chapter) => {
                  return (
                    <div
                      key={chapter._id}
                      className={
                        `dropdown-item ` +
                        (chapter._id === storyState.chapter._id && `active`)
                      }
                    >
                      <Link
                        className="link"
                        to={`/${storyState.story._id}/${chapter._id}/writing`}
                      >
                        <div>{chapter.title}</div>
                      </Link>
                    </div>
                  );
                })}
              </>
            }
            extra={
              <button
                type="button"
                onClick={handleNewPartClick}
                className="orange-button btn new-part-btn"
              >
                + New Part
              </button>
            }
          />
        </section>

        <section className="buttons">
          {mutationState.isLoading && (
            <div style={{ marginRight: "15px" }}>
              <ClipLoader size={15} color="#fff" />
            </div>
          )}

          {storyState.chapter.visibility === "draft" && (
            <button
              onClick={handlePublishClick}
              type="submit"
              className="btn orange-button"
            >
              Publish
            </button>
          )}

          {storyState.chapter.visibility === "published" && (
            <button
              onClick={handleUnpublishClick}
              type="submit"
              className="btn orange-button"
            >
              Unpublish
            </button>
          )}

          <button type="submit" id="saveButton" className="btn btn-grey">
            Save
          </button>
          <button className="btn btn-grey">Preview</button>
          <div className="options">
            {deleteChapterMutation.isLoading ? (
              <ClipLoader color="rgb(0, 178, 178)" size={18} />
            ) : (
              <DropdownMenu
                button={
                  <div className="icon">
                    <RiMoreFill />
                  </div>
                }
                menu={
                  <>
                    <button
                      onClick={handleDeleteClick}
                      className="dropdown-item"
                      type="button"
                    >
                      <div className="icon">
                        <FaTrash />
                      </div>
                      Delete Chapter
                    </button>
                  </>
                }
              />
            )}
          </div>
        </section>
      </nav>
    </StyledStoryNavbar>
  );
};

export default Navbar;
