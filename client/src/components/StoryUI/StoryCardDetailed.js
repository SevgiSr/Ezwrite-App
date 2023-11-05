import { AiFillDislike, AiOutlineBars, AiOutlineDown } from "react-icons/ai";
import { BsFillArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import Cover from "../Cover";
import StyledStoryCardDetailed from "../styles/StoryCardDetailed.styled";
import { useContext, useState } from "react";
import ModalCenter from "../ModalCenter";
import ProfilePicture from "../ProfilePicture";
import UserLine from "../UserUI/UserLine";
import Metadata from "../MetadataUI/MetadataComments";
import { UserContext } from "../../context/userContext";
import Tag from "../Tag";
import StoryModal from "../StoryModal";
import MetadataDetailed from "../MetadataUI/MetadataDetailed";
import { useEffect } from "react";
import MetadataBasic from "../MetadataUI/MetadataBasic";

const StoryCardDetailed = ({ story }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("click");
    setIsModalOpen(true);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const myProgress = story.progress.find((p) => p.user === userState.user._id);

  if (!story) return null;
  return (
    <StyledStoryCardDetailed>
      <div className="cover link" onClick={handleClick}>
        <Cover filename={story._id} width="180px" />
      </div>
      <div className="content">
        <div className="link" onClick={handleClick}>
          <h3 className="title">{story.title}</h3>
        </div>

        <div className="author">
          <UserLine
            user={story.author}
            width={windowWidth > 540 ? "35px" : "21px"}
          />
        </div>

        <div className="metadata">
          {windowWidth > 540 ? (
            <MetadataDetailed
              views={story.views}
              upvotes={story.votesCount.upvotes}
              downvotes={story.votesCount.downvotes}
              chapters={story.chapters.length}
            />
          ) : (
            <MetadataBasic
              views={story.views}
              upvotes={story.votesCount.upvotes}
              downvotes={story.votesCount.downvotes}
              chapters={story.chapters.length}
            />
          )}
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
      <StoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        story={story}
      />
    </StyledStoryCardDetailed>
  );
};

export default StoryCardDetailed;
