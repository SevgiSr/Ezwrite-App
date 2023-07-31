import { AiFillDislike, AiOutlineBars, AiOutlineDown } from "react-icons/ai";
import { BsFillArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import Cover from "./Cover";
import StyledStoryCardDetailed from "./styles/StoryCardDetailed.styled";
import { useContext, useState } from "react";
import ModalCenter from "./ModalCenter";
import ProfilePicture from "./ProfilePicture";
import UserLine from "./UserLine";
import Metadata from "./Metadata";
import { UserContext } from "../context/userContext";
import Tag from "./Tag";

const StoryCardDetailed = ({ story }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("click");
    setIsModalOpen(true);
  };

  const myProgress = story.progress.find((p) => p.user === userState.user._id);

  if (!story) return null;
  return (
    <StyledStoryCardDetailed>
      <div className="cover link" onClick={handleClick}>
        <Cover filename={story._id} width="160px" />
      </div>
      <div className="content">
        <div className="link" onClick={handleClick}>
          <h3 className="title">{story.title}</h3>
        </div>

        <div className="author">
          <UserLine user={story.author} />
        </div>

        <div className="meta-data">
          <div>
            <div className="icon">
              <GoEye />
              <span>Reads</span>
            </div>
            <div className="count">{story.views}</div>
          </div>
          <div>
            <div className="icon">
              <BsFillStarFill />
              <span>Votes</span>
            </div>
            <div className="count">{story.votesCount.upvotes}</div>
          </div>
          <div>
            <div className="icon">
              <AiFillDislike />
              <span>Downvotes</span>
            </div>
            <div className="count">{story.votesCount.downvotes}</div>
          </div>
          <div>
            <div className="icon">
              <AiOutlineBars />
              <span>Parts</span>
            </div>
            <div className="count">{story.chapters.length}</div>
          </div>
        </div>
        <div className="tags">
          {story.tags?.slice(0, 4).map((tag) => {
            return <Tag tag={tag} fontSize="10px" />;
          })}
          {story.tags?.length > 4 && (
            <span style={{ fontSize: "30px", lineHeight: "0" }}>...</span>
          )}
        </div>
        <div className="description">
          {story.description.slice(0, 159)}
          {story.description.length > 361 && "..."}
        </div>
      </div>
      <ModalCenter
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        content={
          <div className="modal-content">
            <div className="modal-main">
              <Cover filename={story._id} width="200px" />
              <Metadata
                views={story.views}
                upvotes={story.votesCount.upvotes}
                downvotes={story.votesCount.downvotes}
                comments={story.comments.length}
              />
            </div>
            <div className="modal-details">
              <h3 className="modal-title">{story.title}</h3>
              <div className="user-line">
                <UserLine user={story.author} />
              </div>
              <div className="modal-description">
                {story.description.slice(0, 368)}
                {story.description.length > 370 && "..."}
              </div>
              <Link to={`/story/${story._id}`} className="details-btn">
                <span>See Details</span>{" "}
                <span className="icon details-icon">
                  <AiOutlineDown />
                </span>
              </Link>
              <button
                className="btn orange-button read-btn"
                onClick={() => {
                  if (!myProgress) {
                    console.log("first chapter");
                    navigate(`/${story._id}/${story.chapters[0]}`);
                  } else if (
                    story.chapters.indexOf(myProgress.currentChapter) < 0
                  ) {
                    console.log("story page");
                    navigate(`/story/${story._id}`);
                  } else {
                    console.log("progress current chapter");
                    navigate(`/${story._id}/${myProgress.currentChapter}`);
                  }
                }}
              >
                Start Reading
              </button>
            </div>
          </div>
        }
      />
    </StyledStoryCardDetailed>
  );
};

export default StoryCardDetailed;
