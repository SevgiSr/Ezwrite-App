//read from database
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import StyledStoryNavbar from "./styles/StoryNavbar.styled";
const Navbar = ({ handlePublishClick }) => {
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
