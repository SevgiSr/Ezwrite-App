import { useEffect, useRef, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { Navbar } from "../components";
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { useParams } from "react-router-dom";
import he from "he";
import { BsFillPencilFill } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import StyledWriting from "./styles/Writing.styled";

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

  //wrap first line of contentEditable div into a div
  const handleInput = (e) => {
    const div = contentEditableRef.current;
    const firstLine = div.innerText.split("\n")[0];

    if (firstLine && !div.querySelector("div")) {
      const newDiv = document.createElement("div");
      newDiv.innerText = firstLine;
      div.innerHTML = div.innerHTML.replace(firstLine, "");
      div.insertBefore(newDiv, div.firstChild);
    }
  };

  const handleWriteClick = (currentNode) => {
    // Get the parent node of the icon
    const icon = document.querySelector(".icon");
    const parentNode = icon.parentNode;

    // Create the wrapper div element
    const wrapper = document.createElement("div");

    // Render the AIForm component into the wrapper div element
    ReactDOM.render(<AIForm />, wrapper);

    // Insert the wrapper element before the parentNode
    parentNode.insertAdjacentElement("beforebegin", wrapper);

    const input = wrapper.querySelector("input");
    input.value = parentNode.textContent.trim();

    // Hide the parentNode
    parentNode.style.display = "none";

    // Set the focus on the input element
    wrapper.querySelector("input").focus();
  };

  const listener = (e) => {
    const editStory = document.getElementById("editStory");
    const divs = document.getElementsByTagName("div");
    // get editStory's childs but not itself
    const filteredDivs = Array.from(divs).filter(
      (div) => editStory.contains(div) && div !== editStory
    );
    // whenever you click or enter, reset all the previous ones
    filteredDivs.map((div) => {
      const icon = div.querySelector(".icon");
      if (icon) icon.parentNode.removeChild(icon);
    });
    filteredDivs.map((div) => (div.className = ""));

    if (e.key === "Enter") {
      // wait so that it recognizes the last element cursor is at
      setTimeout(() => {
        const selection = window.getSelection();
        const currentNode = selection.focusNode;
        currentNode.classList.add("active-paragraph");

        // Add the icon element to the currentNode
        const icon = document.createElement("div");
        icon.classList.add("icon");
        // Render the icon component into the div element using ReactDOM.render()
        createRoot(icon).render(
          <BsFillPencilFill onClick={() => handleWriteClick(currentNode)} />
        );
        currentNode.appendChild(icon);
      }, 10);
    } else {
      if (filteredDivs.includes(e.target)) {
        e.target.className = "active-paragraph";

        // Add the icon element to the activeNode
        const icon = document.createElement("div");
        icon.classList.add("icon");
        // Render the icon component into the span element using ReactDOM.render()
        createRoot(icon).render(
          <BsFillPencilFill onClick={() => handleWriteClick(e.target)} />
        );
        e.target.appendChild(icon);
      }
    }
  };

  const inputListener = (e) => {
    const formContainer = document.querySelector(".ai-form-container");
    const icon = document.querySelector(".icon");

    if (icon && icon.includes(e.target)) {
      return;
    }

    if (formContainer && !formContainer.contains(e.target)) {
      const prevNode = formContainer.parentNode.nextElementSibling;
      console.log(prevNode);
      console.log(formContainer.parentNode);
      const formWrapper = formContainer.parentNode;
      formWrapper.parentNode.removeChild(formWrapper);
      prevNode.style.display = "block";
    }
  };

  useEffect(() => {
    document.addEventListener("click", inputListener);
    window.addEventListener("click", listener);
    window.addEventListener("keypress", listener);
    return () => {
      document.removeEventListener("click", inputListener);
      window.removeEventListener("click", listener);
      window.removeEventListener("keypress", listener);
    };
  }, []);

  return (
    <StyledWriting>
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
            onInput={handleInput}
            style={{
              minHeight: "100vh",
              outline: "none",
              position: "relative",
            }}
            dangerouslySetInnerHTML={{
              __html: he.decode(chapterBody ? chapterBody : ""),
            }}
          />
        </div>
      </form>
    </StyledWriting>
  );
}

function AIForm() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted!");
    const prevNode = e.target.parentNode.nextElementSibling;
    prevNode.parentNode.removeChild(prevNode);
    e.target.parentNode.innerHTML = "Hello World";
  };

  return (
    <form onSubmit={handleSubmit} className="ai-form-container ai">
      <div className="flex-row">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.preventDefault()}
          className="edit-input"
        />
        <button type="submit">
          <FaRegPaperPlane />
        </button>
      </div>
      <div className="style">
        <label htmlFor="language">Writing Style</label>
        <div id="language" style={{ width: "200px" }}>
          <select onChange={(e) => setStyle(e.target.value)} name="style">
            <option value="comedic">Comedic</option>
            <option value="descriptive">Descriptive</option>
            <option value="emotional">Emotional</option>
            <option value="persuasive">Persuasive</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default Writing;
