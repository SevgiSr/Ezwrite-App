import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyStoryContext } from "../context/myStoryContext";
import StyledMyStory from "./styles/MyStory.styled";
import Cover from "./Cover";
import { FiChevronDown } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";

const MyStory = ({ story }) => {
  const navigate = useNavigate();
  const { setEditStory } = useContext(MyStoryContext);

  const handleClick = () => {
    navigate(`/${story._id}`);
    setEditStory(story._id);
  };

  return (
    <StyledMyStory>
      <div className="cover">
        <Cover filename={story._id} width="80px" height="125px" />
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
            buttonClass="orange-button"
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

        <button className="white-button">
          <span className="text">Delete Story</span>
        </button>
      </div>
    </StyledMyStory>
  );
};

//learn how to add param routes

export default MyStory;
