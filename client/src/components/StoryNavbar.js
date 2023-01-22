//read from database
import "../assets/StoryNavbar.css";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
const Navbar = () => {
  const { reducerState } = useContext(AppContext);
  return (
    <nav className="navbarContainer">
      <div id="storyPreview">
        <p id="titlePreview">{reducerState.story.title}</p>
        <h4 id="chapterPreview">{reducerState.chapter.title}</h4>
        <p id="updatePreview">blank</p>
      </div>
      <button type="submit" id="saveButton">
        Save
      </button>
    </nav>
  );
};

export default Navbar;
