import "../assets/Writing.css";
import { useEffect, useRef, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { Navbar } from "../components";
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { useParams } from "react-router-dom";
import he from "he";

function Writing() {
  const [chapterBody, setChapterBody] = useState("Type the text...");
  const [chapterTitle, setChapterTitle] = useState("");
  const { storyState, editChapter, saveChapter } = useContext(MyStoryContext);
  const { story_id, chapter_id } = useParams();

  const contentEditableRef = useRef(null);

  useEffect(() => {
    // Set the focus to the end of the contentEditable div
    contentEditableRef.current.focus();
    const range = document.createRange();
    range.selectNodeContents(contentEditableRef.current);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }, [chapterBody]);

  const handleChange = (e) => {
    setChapterTitle(e.target.value);
  };

  const handleInput = (e) => {
    setChapterBody(e.target.innerHTML);
  };

  //as soon s u load, make get request to get chapther's title and content adn set it on reducer's chapter
  useEffect(() => {
    editChapter(story_id, chapter_id);
  }, []);

  //after get request, chapter in reducer is set and setChapter sets title and content in frontend
  useEffect(() => {
    const { chapter } = storyState;
    console.log(chapter);
    setChapterTitle(chapter.title);
    setChapterBody(chapter.content);
  }, [storyState.chapter]);

  //saves in the backend and also cuz reducer's chapter changed useeffect gonna set it on frontend
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = document.getElementById("editStory").innerHTML;
    const chapter = {
      title: chapterTitle,
      body: content,
    };
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
          value={chapterTitle}
          placeholder="story title..."
        />
        <hr style={{ color: "gray", width: "60%" }} />
        {/* <textarea
          id="editStory"
          name="body"
          onChange={handleChange}
          value={chapter.body}
          onKeyDown={handleKeyDown}
          style={{ height: "100vh" }}
          placeholder="Type your text..."
        /> */}
        <div
          ref={contentEditableRef}
          id="editStory"
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          style={{ minHeight: "100vh", outline: "none" }}
          dangerouslySetInnerHTML={{
            __html: he.decode(chapterBody ? chapterBody : ""),
          }}
        />
      </div>
    </form>
  );
}

export default Writing;
