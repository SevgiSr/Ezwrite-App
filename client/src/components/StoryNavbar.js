//read from database
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import StyledStoryNavbar from "./styles/StoryNavbar.styled";
import { ClipLoader } from "react-spinners";

const Navbar = ({ handlePublishClick, isChapterLoading }) => {
  const { storyState } = useContext(MyStoryContext);

  return (
    <StyledStoryNavbar>
      <nav className="navbarContainer">
        <div id="storyPreview">
          <p id="titlePreview">{storyState.story.title}</p>
          <h4 id="chapterPreview">{storyState.chapter.title}</h4>
          <p id="updatePreview">
            Draft <span>Saved</span>
          </p>
        </div>

        <div className="buttons">
          {isChapterLoading && (
            <div style={{ marginRight: "15px" }}>
              <ClipLoader size={15} color="#222" />
            </div>
          )}
          <button onClick={handlePublishClick} className="btn orange-button">
            Publish
          </button>
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
