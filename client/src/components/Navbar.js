//read from database
import "../assets/Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbarContainer">
      <div id="storyPreview">
        <p id="titlePreview">blank</p>
        <h4 id="chapterPreview">blank</h4>
        <p id="updatePreview">blank</p>
      </div>
      <button id="saveButton">Save</button>
    </nav>
  );
};

export default Navbar;
