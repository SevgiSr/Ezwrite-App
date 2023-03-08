import { useContext, useEffect, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { FaBars, FaComment } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cover from "../components/Cover";
import OrangeLinks from "../components/OrangeLinks";
import { MyStoryContext } from "../context/myStoryContext";
import StyledEditStoryDetails from "./styles/EditStoryDetails.styled";
import { PulseLoader } from "react-spinners";

function EditStoryDetails() {
  const { storyState, alertState, addChapter, getMyStory, updateCover } =
    useContext(MyStoryContext);
  const { story_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMyStory(story_id);
    console.log(storyState.myStory);
  }, [story_id]);

  const getDate = (date) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    return formattedDate;
  };

  const handleCoverChange = (e) => {
    updateCover(e.target.files[0], story_id);
  };

  const handleNewPartClick = async () => {
    const newChapter_id = await addChapter(story_id);
    navigate(`/${story_id}/${newChapter_id}/writing`);
  };

  return (
    <StyledEditStoryDetails>
      <div className="story-manage">
        <div className="cover">
          <div className="cover-overlay">
            {alertState.isLoading ? (
              <PulseLoader />
            ) : (
              <Cover filename={story_id} width="280px" />
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
        <Link to={`/story/${story_id}/`} className="orange-button view-btn">
          View as reader
        </Link>
      </div>
      <div className="chapters-main card">
        <header>
          <OrangeLinks
            links={[
              { to: "", label: "Story Details" },
              { to: "", label: "Table of Contents" },
            ]}
          />
        </header>
        <button onClick={handleNewPartClick} className="orange-button">
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
                      <div className="count">
                        {chapter.votesCount.downvotes}
                      </div>
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
    </StyledEditStoryDetails>
  );
}

export default EditStoryDetails;
