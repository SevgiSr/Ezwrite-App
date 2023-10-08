import { Link, useNavigate } from "react-router-dom";
import Cover from "./Cover";
import Metadata from "./Metadata";
import ModalCenter from "./ModalCenter";
import UserLine from "./UserUI/UserLine";
import StyledStoryModal from "./styles/StoryModal.styled";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function StoryModal({ story, isOpen, setIsOpen }) {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  const myProgress = story.progress.find((p) => p.user === userState.user._id);

  return (
    <StyledStoryModal>
      <ModalCenter
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={
          <div className="modal-content-custom">
            <div className="modal-main">
              <div className="cover">
                <Cover filename={story._id} width="200px" />
                <Link to={`/story/${story._id}`} className="details-btn">
                  <span>See Details</span>{" "}
                  <span className="icon details-icon">
                    <AiOutlineRight />
                  </span>
                </Link>
              </div>
              <div className="metadata">
                <Metadata
                  views={story.views}
                  upvotes={story.votesCount.upvotes}
                  downvotes={story.votesCount.downvotes}
                  comments={story.comments.length}
                />
              </div>
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

              <button
                className="btn btn-main read-btn"
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
    </StyledStoryModal>
  );
}

export default StoryModal;
