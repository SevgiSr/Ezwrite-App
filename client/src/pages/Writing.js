import "../assets/Writing.css";
import { useEffect, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { Navbar } from "../components";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { useParams } from "react-router-dom";

function Writing() {
  const [chapter, setChapter] = useState({ body: "", title: "" });
  const { reducerState, editChapter, saveChapter } = useContext(AppContext);
  const { story_id, chapter_id } = useParams();
  const handleChange = (e) => {
    setChapter({ ...chapter, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    editChapter(story_id, chapter_id);
  }, []);

  useEffect(() => {
    const { chapter } = reducerState;
    setChapter({ title: chapter.title, body: chapter.content });
  }, [reducerState.chapter]);

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
