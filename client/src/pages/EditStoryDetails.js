import { useContext, useEffect, useState } from "react";
import { FaBars, FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Cover from "../components/Cover";
import { MyStoryContext } from "../context/myStoryContext";
import StyledEditStoryDetails from "./styles/EditStoryDetails.styled";
import { ClipLoader, SyncLoader } from "react-spinners";
import getDate from "../utils/getDate";
import { IoIosArrowBack } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DropdownMenu, MetadataComments, StoryDetails } from "../components";
import { RiMoreFill } from "react-icons/ri";

function EditStoryDetails() {
  const queryClient = useQueryClient();
  const {
    storyState,
    alertState,
    getMyStories,
    setMyStory,
    updateCover,
    updateStory,
  } = useContext(MyStoryContext);
  const { story_id } = useParams();
  const { story } = storyState;

  const navigate = useNavigate();
  const location = useLocation();

  const [navbar, setNavbar] = useState("contents");

  const [storyDetails, setStoryDetails] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
  });

  const [tags, setTags] = useState([]);

  const [timestamp, setTimestamp] = useState(Date.now());

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // REMOVED BACKEND REQUEST THAT IS MADE FOR EACH AND SINGLE STORY

  //Instead decided to store myStories in the cache and take out individual stories out of there.

  //if it exists in the cache it'll appear as fresh and backend request WON'T be made. isFetching will be false but because location changed myStory will be updated anyways.
  //if it doesn't backend request will be made and after fetching is done myStory is updated the same way
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
      console.log("STORYY: " + myStory);
      setMyStory(myStory);
    }
  }, [location, isFetching]);

  useEffect(() => {
    const { story } = storyState;
    if (story && Object.keys(story).length !== 0) {
      console.log(story);

      setStoryDetails({
        title: story.title,
        description: story.description,
        category: story.category,
        language: story.language,
      });
      const tagNames = story.tags?.map((tag) => tag.name);
      setTags(tagNames);
    }
  }, [storyState]);

  const mutation = useMutation(
    (data) => updateStory(data.story_id, data.storyDetails),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myStories"]);
      },
    }
  );

  const handleCoverChange = (e) => {
    updateCover(e.target.files[0], story_id);
    setTimestamp(Date.now());
  };

  const handleCancel = () => {
    setStoryDetails({
      title: story.title,
      description: story.description,
      category: story.category,
      language: story.language,
    });
    const tagNames = story.tags.map((tag) => tag.name);
    setTags(tagNames);
    navigate("/workspace/myStories/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storyDetails.tags = tags;
    console.log(storyDetails);
    mutation.mutate({ story_id, storyDetails });
  };

  if (isLoading) return null;

  return (
    <StyledEditStoryDetails>
      <Navbar handleCancel={handleCancel} />
      <div className="story-manage">
        <div className="cover">
          <div className="cover-overlay">
            {alertState.isLoading ? (
              <div className="pulse-loader">
                <SyncLoader />
              </div>
            ) : (
              <Cover
                filename={story_id}
                width={windowWidth > 1000 ? "280px" : "210px"}
                timestamp={timestamp}
                isStatic={true}
              />
            )}
          </div>
          <h1 className="title">{story.title}</h1>
          <label htmlFor="upload" className="upload-picture">
            <div className="edit-cover-btn">Edit Your Cover</div>
            <input
              id="upload"
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              name="file"
              onChange={handleCoverChange}
            />
          </label>
        </div>
        <Link to={`/story/${story_id}/`} className="view-btn btn btn-main">
          View as reader
        </Link>
      </div>
      <div className="chapters-main">
        <header>
          <ul>
            <li
              onClick={() => setNavbar("details")}
              className={navbar === "details" && "active"}
            >
              Story Details
            </li>
            <li
              onClick={() => setNavbar("contents")}
              className={navbar === "contents" && "active"}
            >
              Table of Contents
            </li>
          </ul>
        </header>

        {navbar === "details" && (
          <div className="details">
            <StoryDetails
              storyDetails={storyDetails}
              tags={tags}
              setStoryDetails={setStoryDetails}
              setTags={setTags}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
        {navbar === "contents" && <Contents />}
      </div>
    </StyledEditStoryDetails>
  );
}

function Navbar({ handleCancel }) {
  const { storyState } = useContext(MyStoryContext);
  const { story } = storyState;
  return (
    <nav className="story-navbar">
      <header>
        <Link to="/workspace/myStories/" className="back-btn">
          <div className="icon">
            <IoIosArrowBack />
          </div>
        </Link>
        <div className="story">
          <span>Edit Story Details</span>
          <div className="title">{story.title}</div>
        </div>
      </header>
      <div className="buttons">
        <button onClick={handleCancel} className="btn btn-grey">
          Cancel
        </button>
        <button form="story-details" className="btn btn-main">
          Save
        </button>
      </div>
    </nav>
  );
}

function Contents() {
  const { storyState, useAddChapter, useDeleteChapter } =
    useContext(MyStoryContext);
  const { story } = storyState;
  const { story_id } = useParams();
  const navigate = useNavigate();

  const addChapterMutation = useAddChapter();
  const deleteChapterMutation = useDeleteChapter();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNewPartClick = async () => {
    const data = await addChapterMutation.mutateAsync({
      story_id: story_id,
    });
    navigate(`/myworks/${data.story_id}/${data.chapter_id}/writing`);
  };

  const handleDeleteClick = async (chapter_id) => {
    await deleteChapterMutation.mutateAsync({ story_id, chapter_id });
  };

  return (
    <div id="contents">
      <button
        disabled={deleteChapterMutation.isLoading}
        onClick={handleNewPartClick}
        className="btn btn-main new-part-btn"
      >
        + New Part
      </button>
      {story.chapters?.map((chapter) => {
        return (
          <div key={chapter._id} className="chapter-row">
            <div className="bars-icon icon">
              <FaBars />
            </div>
            <div className="chapter">
              <Link
                style={{ textDecoration: "none" }}
                to={`/myworks/${story_id}/${chapter._id}/writing`}
              >
                <h3 className="title">{chapter.title}</h3>
              </Link>
              <div className="info">
                <span className="visibility">Published - </span>
                <span className="last-update">
                  {getDate(chapter.updatedAt)}
                </span>
              </div>
              {windowWidth <= 720 && (
                <div className="metadata">
                  <MetadataComments
                    views={chapter.views}
                    likes={chapter.votesCount.upvotes}
                    dislikes={chapter.votesCount.downvotes}
                    comments={chapter.chapterConvs}
                  />
                </div>
              )}
            </div>
            {windowWidth > 720 && (
              <div className="metadata">
                <MetadataComments
                  views={chapter.views}
                  likes={chapter.votesCount.upvotes}
                  dislikes={chapter.votesCount.downvotes}
                  comments={chapter.chapterConvs}
                />
              </div>
            )}

            <div className="options">
              {deleteChapterMutation.isLoading ? (
                <ClipLoader color="rgb(0, 178, 178)" size={25} />
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
                        onClick={() => handleDeleteClick(chapter._id)}
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
          </div>
        );
      })}
    </div>
  );
}

export default EditStoryDetails;
