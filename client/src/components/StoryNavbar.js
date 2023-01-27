//read from database
import "../assets/StoryNavbar.css";
import { useContext } from "react";
import { StoryContext } from "../context/storyContext";
const Navbar = () => {
  const { storyState } = useContext(StoryContext);
  return (
    <nav className="navbarContainer">
      <div id="storyPreview">
        <p id="titlePreview">{storyState.story.title}</p>
        <h4 id="chapterPreview">{storyState.chapter.title}</h4>
        <p id="updatePreview">blank</p>
      </div>
      <button type="submit" id="saveButton">
        Save
      </button>
    </nav>
  );
};

export default Navbar;
