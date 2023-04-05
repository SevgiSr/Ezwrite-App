import "../assets/Writing.css";
import { useEffect, useRef, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { Navbar } from "../components";
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { useParams } from "react-router-dom";
import he from "he";

function Writing() {
  //dont change chapterBody at each typed character or cursor gets messed up - no onInput(aka. onChange)
  //just use it for saving and first loading times
  const [chapterBody, setChapterBody] = useState("Type the text...");
  const [chapterTitle, setChapterTitle] = useState("");
  const { storyState, editChapter, saveChapter } = useContext(MyStoryContext);
  const { story_id, chapter_id } = useParams();

  const contentEditableRef = useRef(null);

  const handleChange = (e) => {
    setChapterTitle(e.target.value);
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

  /*   const handleClick = (e) => {
    console.log("clicked");
    const selection = window.getSelection();
    console.log(selection);
    const lineNumber =
      selection.anchorNode.parentElement.getAttribute("data-line-number");
    console.log(selection.anchorNode.parentElement);
    setSelectedLine(lineNumber);
  }; */

  const listener = (e) => {
    const editStory = document.getElementById("editStory");
    const divs = document.getElementsByTagName("div");
    const filteredDivs = Array.from(divs).filter((div) =>
      editStory.contains(div)
    );
    if (e.key === "Enter") {
      console.log("enter");
    } else {
      filteredDivs.map((div) => (div.className = ""));
      if (filteredDivs.includes(e.target)) {
        e.target.className = "active-paragraph";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", listener);
    window.addEventListener("keypress", listener);
    return () => {
      window.removeEventListener("click", listener);
      window.removeEventListener("keypress", listener);
    };
  }, []);

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
          onKeyDown={handleKeyDown}
          style={{ minHeight: "100vh", outline: "none", position: "relative" }}
          dangerouslySetInnerHTML={{
            __html: he.decode(chapterBody ? chapterBody : ""),
          }}
        />
      </div>
    </form>
  );
}

export default Writing;
