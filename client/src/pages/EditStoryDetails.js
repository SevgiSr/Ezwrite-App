import { useContext, useEffect, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { FaBars, FaComment } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Cover from "../components/Cover";
import OrangeLinks from "../components/OrangeLinks";
import { MyStoryContext } from "../context/myStoryContext";
import StyledEditStoryDetails from "./styles/EditStoryDetails.styled";
import { PulseLoader, RotateLoader, SyncLoader } from "react-spinners";
import getDate from "../utils/getDate";
import StoryDetails from "../components/StoryDetails";
import { IoIosArrowBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";

function EditStoryDetails() {
  const {
    storyState,
    alertState,
    addChapter,
    getMyStories,
    setMyStory,
    updateCover,
    updateStory,
  } = useContext(MyStoryContext);
  const { story_id } = useParams();

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
      setMyStory(myStory);
    }
  }, [location, isFetching]);

  useEffect(() => {
    const { myStory } = storyState;

    setStoryDetails({
      title: myStory.title,
      description: myStory.description,
      category: myStory.category,
      language: myStory.language,
    });
    setTags(myStory.tags);
  }, [storyState.myStory]);

  const handleCoverChange = (e) => {
    updateCover(e.target.files[0], story_id);
    setTimestamp(Date.now());
  };

  const handleCancel = () => {
    const { myStory } = storyState;
    setStoryDetails({
      title: myStory.title,
      description: myStory.description,
      category: myStory.category,
      language: myStory.language,
    });
    setTags(myStory.tags);
    navigate("/myStories");
  };

  const handleSubmit = () => {
    storyDetails.tags = tags;
    updateStory(story_id, storyDetails);
  };

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
              <Cover filename={story_id} width="280px" timestamp={timestamp} />
            )}
          </div>
          <h1 className="title">{storyState.myStory.title}</h1>
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
        <Link to={`/story/${story_id}/`} className="orange-button view-btn btn">
          View as reader
        </Link>
      </div>
      <div className="chapters-main card">
        <header>
          <OrangeLinks
            links={[
              {
                to: "",
                label: "Story Details",
                handleClick: () => setNavbar("details"),
              },
              {
                to: "",
                label: "Table of Contents",
                handleClick: () => setNavbar("contents"),
              },
            ]}
          />
        </header>

        {navbar === "details" && (
          <StoryDetails
            storyDetails={storyDetails}
            tags={tags}
            setStoryDetails={setStoryDetails}
            setTags={setTags}
            handleSubmit={handleSubmit}
          />
        )}
        {navbar === "contents" && <Contents />}
      </div>
    </StyledEditStoryDetails>
  );
}

function Navbar({ handleCancel }) {
  const { storyState } = useContext(MyStoryContext);
  return (
    <nav className="story-navbar">
      <header>
        <Link to="/myStories" className="back-btn">
          <div className="icon">
            <IoIosArrowBack />
          </div>
        </Link>
        <div className="story">
          <span>Edit Story Details</span>
          <div className="title">{storyState.myStory.title}</div>
        </div>
      </header>
      <div className="buttons">
        <button onClick={handleCancel} className="white-button btn">
          Cancel
        </button>
        <button form="story-details" className="orange-button btn">
          Save
        </button>
      </div>
    </nav>
  );
}

function Contents() {
  const { storyState, addChapter } = useContext(MyStoryContext);
  const { story_id } = useParams();
  const navigate = useNavigate();

  const handleNewPartClick = async () => {
    const newChapter_id = await addChapter(story_id);
    navigate(`/${story_id}/${newChapter_id}/writing`);
  };

  return (
    <div id="contents">
      <button onClick={handleNewPartClick} className="orange-button btn">
        New Part
      </button>
      {storyState.myStory?.chapters?.map((chapter) => {
        return (
          <div className="row">
            <div className="icon">
              <FaBars />
            </div>
            <div className="chapter">
              <Link
                style={{ textDecoration: "none" }}
                to={`/${story_id}/${chapter._id}/writing`}
              >
                <h3 className="title">{chapter.title}</h3>
              </Link>
              <div className="info">
                <div>
                  <span className="visibility">Published - </span>
                  <span className="last-update">
                    {getDate(chapter.updatedAt)}
                  </span>
                </div>
                <div className="metadata">
                  <div>
                    <div className="icon">
                      <GoEye />
                    </div>
                    <div className="count">{chapter.views}</div>
                  </div>
                  <div>
                    <div className="icon">
                      <BsFillStarFill />
                    </div>
                    <div className="count">{chapter.votesCount.upvotes}</div>
                  </div>
                  <div>
                    <div className="icon">
                      <AiFillDislike />
                    </div>
                    <div className="count">{chapter.votesCount.downvotes}</div>
                  </div>
                  <div>
                    <div className="icon">
                      <FaComment />
                    </div>
                    <div className="count">
                      {chapter.chapterConvs ? chapter.chapterConvs.length : 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EditStoryDetails;
