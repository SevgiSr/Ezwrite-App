//read from database
import { useContext, useEffect, useState } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import StyledStoryNavbar from "./styles/StoryNavbar.styled";
import { ClipLoader } from "react-spinners";
import Cover from "./Cover";
import { FiChevronDown } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiMoreFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";
import he from "he";
import getDate from "../utils/getDate";
import { MyForkContext } from "../context/myForkContext";

const Navbar = () => {
  const {
    storyState,
    useAddChapter,
    mutationState: mutationStateStory,
    useDeleteChapter,
    usePublishChapter,
    useUnpublishChapter,
    useRestoreChapterHistory,
  } = useContext(MyStoryContext);

  const {
    forkState,
    mutationState: mutationStateFork,
    useAddForkChapter,
    useDeleteForkChapter,
    useRestoreForkChapterHistory,
  } = useContext(MyForkContext);

  const navigate = useNavigate();
  const params = useParams();
  const { story_id, fork_id, chapter_id } = params;
  const [myWork, setMyWork] = useState("");
  const [state, setState] = useState({ story: {}, chapters: [], chapter: {} });
  const location = useLocation();

  const addChapterMutation = useAddChapter();
  const deleteChapterMutation = useDeleteChapter();
  const publishChapterMutation = usePublishChapter();
  const unpublishChapterMutation = useUnpublishChapter();
  const restoreChapterHistoryMutation = useRestoreChapterHistory();

  const addForkChapterMutation = useAddForkChapter();
  const deleteForkChapterMutation = useDeleteForkChapter();
  const restoreForkChapterHistoryMutation = useRestoreForkChapterHistory();

  useEffect(() => {
    if (location.pathname.split("/")[1] === "myworks") {
      setMyWork("story");
      setState(storyState);
    } else if (location.pathname.split("/")[1] === "myforks") {
      setMyWork("fork");
      setState(forkState);
    }
  }, [location, forkState, storyState]);

  const handleNewPartClick = async () => {
    if (myWork === "story") {
      const { chapter_id, story_id } = await addChapterMutation.mutateAsync({
        story_id: params.story_id,
      });

      navigate(`/myworks/${story_id}/${chapter_id}/writing`);
    } else if (myWork === "fork") {
      const { chapter_id, fork_id } = await addForkChapterMutation.mutateAsync({
        fork_id: params.fork_id,
      });

      navigate(`/myforks/${fork_id}/${chapter_id}/writing`);
    }
  };

  //YOU HAVE TO
  //if you want to navigate only after mutation ended:
  const handleDeleteClick = async () => {
    if (myWork === "story") {
      await deleteChapterMutation.mutateAsync({ story_id, chapter_id });
      navigate(`/${story_id}`);
    } else if (myWork === "fork") {
      await deleteForkChapterMutation.mutateAsync({ fork_id, chapter_id });
    }
  };

  const handlePublishClick = () => {
    if (myWork === "story") {
      publishChapterMutation.mutate({ story_id, chapter_id });
    }
  };

  const handleUnpublishClick = () => {
    if (myWork === "story") {
      unpublishChapterMutation.mutate({ story_id, chapter_id });
    }
  };

  const handleRestoreHistoryClick = (history_id) => {
    if (myWork === "story") {
      restoreChapterHistoryMutation.mutate({
        story_id,
        chapter_id,
        history_id,
      });
    } else if (myWork === "fork") {
      restoreForkChapterHistoryMutation.mutate({
        fork_id,
        chapter_id,
        history_id,
      });
    }
  };

  if (!state.story) return null;
  if (!state.chapter) return null;
  return (
    <StyledStoryNavbar>
      <nav className="navbarContainer">
        <section className="story-section">
          <Link
            to={
              myWork === "story"
                ? "/workspace/myStories/"
                : "/workspace/myForks/"
            }
            className="back-btn"
          >
            <div className="icon">
              <IoIosArrowBack />
            </div>
          </Link>

          <DropdownMenu
            buttonClass="write-dropdown-btn"
            menuClass="write-dropdown-menu"
            button={
              <div className="story-card">
                <Cover width="40px" filename={state.story._id} />
                <div className="story-info">
                  <p className="story-title">
                    <span>{state.story.title}</span>
                    <span className="icon">
                      <FiChevronDown />
                    </span>
                  </p>
                  <h4 className="chapter-title">{state.chapter.title}</h4>
                  <p className="update-info">
                    {state.chapter.visibility?.toUpperCase()}{" "}
                    <span>(Saved)</span>
                  </p>
                </div>
              </div>
            }
            menu={
              <>
                {state.chapters?.map((chapter) => {
                  return (
                    <div
                      key={chapter._id}
                      className={
                        `dropdown-item ` +
                        (chapter._id === state.chapter._id && `active`)
                      }
                    >
                      <Link
                        className="link"
                        to={
                          (myWork === "story"
                            ? `/myworks/${state.story._id}`
                            : `/myforks/${fork_id}`) + `/${chapter._id}/writing`
                        }
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
          {(mutationStateStory.isLoading || mutationStateFork.isLoading) && (
            <div style={{ marginRight: "15px" }}>
              <ClipLoader size={15} color="#fff" />
            </div>
          )}

          <DropdownMenu
            buttonClass="btn"
            button={
              <>
                <div className="icon">
                  <AiOutlineHistory />
                </div>
                History
              </>
            }
            menu={
              <>
                {!state.chapter.history && (
                  <div style={{ height: "50px", width: "100%" }}></div>
                )}
                {state.chapter.history?.map((history) => {
                  return (
                    <div key={history._id}>
                      <div
                        onClick={() => handleRestoreHistoryClick(history._id)}
                      >
                        {getDate(history?.createdAt)}
                      </div>
                    </div>
                  );
                })}
              </>
            }
          />

          {myWork === "story" &&
            (state.chapter.visibility === "draft" ? (
              <button
                onClick={handlePublishClick}
                type="submit"
                className="btn orange-button"
              >
                Publish
              </button>
            ) : (
              <button
                onClick={handleUnpublishClick}
                type="submit"
                className="btn orange-button"
              >
                Unpublish
              </button>
            ))}

          <button type="submit" id="saveButton" className="btn btn-grey">
            Save
          </button>
          <button className="btn btn-grey">Preview</button>
          <div className="options">
            {deleteChapterMutation.isLoading ||
            deleteForkChapterMutation.isLoading ? (
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
