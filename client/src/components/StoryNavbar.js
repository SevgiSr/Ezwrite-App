//read from database
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import StyledStoryNavbar from "./styles/StoryNavbar.styled";
import { ClipLoader } from "react-spinners";
import Cover from "./Cover";
import { FiChevronDown } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = ({ isChapterLoading }) => {
  const { storyState } = useContext(MyStoryContext);

  return (
    <StyledStoryNavbar>
      <nav className="navbarContainer">
        <DropdownMenu
          buttonClass="write-dropdown-btn"
          button={
            <>
              <div className="story-card">
                <Link to="/myStories" className="back-btn">
                  <div className="icon">
                    <IoIosArrowBack />
                  </div>
                </Link>
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
                    Draft <span>(Saved)</span>
                  </p>
                </div>
              </div>
            </>
          }
          menu={
            <>
              <div>Table of contents</div>
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
        />

        <div className="buttons">
          {isChapterLoading && (
            <div style={{ marginRight: "15px" }}>
              <ClipLoader size={15} color="#222" />
            </div>
          )}
          <button className="btn orange-button">Publish</button>
          <button type="submit" id="saveButton" className="btn btn-grey">
            Save
          </button>
          <button className="btn btn-grey">Preview</button>
        </div>
      </nav>
    </StyledStoryNavbar>
  );
};

export default Navbar;
