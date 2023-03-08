import { useContext, useEffect } from "react";
import { AiFillDislike } from "react-icons/ai";
import { BsFillStarFill } from "react-icons/bs";
import { FaBars, FaComment } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import Cover from "../components/Cover";
import OrangeLinks from "../components/OrangeLinks";
import { MyStoryContext } from "../context/myStoryContext";
import StyledEditStoryDetails from "./styles/EditStoryDetails.styled";

function EditStoryDetails() {
  const { storyState, getMyStory } = useContext(MyStoryContext);
  const { story_id } = useParams();
  const { myStory } = storyState;
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

  return (
    <StyledEditStoryDetails>
      <div className="story-manage">
        <div className="cover">
          <div className="cover-overlay">
            <Cover filename={story_id} width="280px" />
          </div>
          <h1 className="title">{storyState.myStory.title}</h1>
          <button className="edit-cover-btn">Edit Your Cover</button>
        </div>
        <button className="orange-button view-btn">View as reader</button>
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
        <button className="orange-button">New Part</button>
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
