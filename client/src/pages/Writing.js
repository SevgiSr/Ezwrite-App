import "../assets/Writing.css";
import { useEffect, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { Navbar } from "../components";
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { useParams } from "react-router-dom";

function Writing() {
  const [chapter, setChapter] = useState({ body: "", title: "" });
  const { storyState, editChapter, saveChapter } = useContext(MyStoryContext);
  const { story_id, chapter_id } = useParams();
  const handleChange = (e) => {
    setChapter({ ...chapter, [e.target.name]: e.target.value });
  };
  //as soon s u load, make get request to get chapther's title and content adn set it on reducer's chapter
  useEffect(() => {
    editChapter(story_id, chapter_id);
  }, []);

  //after get request, chapter in reducer is set and setChapter sets title and content in frontend
  useEffect(() => {
    const { chapter } = storyState;
    setChapter({ title: chapter.title, body: chapter.content });
  }, [storyState.chapter]);

  //saves in the backend and also cuz reducer's chapter changed useeffect gonna set it on frontend
  const handleSubmit = (e) => {
    e.preventDefault();
    saveChapter(chapter, story_id, chapter_id);
  };

  return (
    <form onSubmit={handleSubmit} className="pageContainer">
      <Navbar />
      <div className="storyContainer">
        <input
          id="editTitle"
          name="title"
          onChange={handleChange}
          value={chapter.title}
          placeholder="story title..."
        />
        <hr style={{ color: "gray", width: "60%" }} />
        <textarea
          id="editStory"
          name="body"
          onChange={handleChange}
          value={chapter.body}
          onKeyDown={handleKeyDown}
          style={{ height: "100vh" }}
          placeholder="Type your text..."
        />
      </div>
    </form>
  );
}

export default Writing;
