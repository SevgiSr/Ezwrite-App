import { useEffect, useRef, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { Navbar } from "../components";
import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { useLocation, useParams } from "react-router-dom";
import he from "he";
import { BsFillPencilFill } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import StyledWriting from "./styles/Writing.styled";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../context/userContext";
import { Discuss } from "react-loader-spinner";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";

function Writing() {
  const queryClient = useQueryClient();
  //dont change chapterBody at each typed character or cursor gets messed up - no onInput(aka. onChange)
  //just use it for saving and first loading times
  const [chapterBody, setChapterBody] = useState("Type the text...");
  const [chapterTitle, setChapterTitle] = useState("");
  const {
    storyState,
    getMyStories,
    setEditChapter,
    saveChapter,
    sendGptPrompt,
    useSaveChapter,
  } = useContext(MyStoryContext);
  const { userState } = useContext(UserContext);
  const { story_id, chapter_id } = useParams();
  const location = useLocation();

  const editorRef = useRef(null);

  useEffect(() => {
    const editor = new MediumEditor(editorRef.current, {
      // any options go here
    });

    return () => {
      // this will cleanup the MediumEditor instance on component unmount
      editor.destroy();
    };
  }, []);

  const handleChange = (e) => {
    setChapterTitle(e.target.value);
  };

  const saveChapterMutation = useSaveChapter();

  const {
    data: myStories = [],
    isLoading,
    isFetching,
    status,
  } = useQuery(["myStories"], getMyStories, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!isFetching && status === "success") {
      const myStory = myStories.find((story) => story._id === story_id);
      const chapter = myStory.chapters.find(
        (chapter) => chapter._id === chapter_id
      );
      setChapterTitle(chapter.title);
      const editor = document.getElementById("editStory");
      editor.innerHTML = chapter.content;
      // Focus on the editor if there is initial content
      if (chapter.content.trim() !== "") {
        editor.focus();
      }
      setEditChapter(myStory, chapter);
    }
  }, [location, isFetching]);

  useEffect(() => {
    const updateForm = async () => {
      if (storyState.gptResponse) {
        const form = document.querySelector(".ai-form-container");
        const prevNode = form.parentNode.nextElementSibling;
        prevNode.parentNode.removeChild(prevNode);
        form.parentNode.innerHTML = storyState.gptResponse;
      }
    };
    updateForm();
  }, [storyState.gptResponse]);

  //saves in the backend and also cuz reducer's chapter changed useeffect gonna set it on frontend
  const handleSubmit = (e) => {
    e.preventDefault();
    const editorContent = document.getElementById("editStory");
    const paragraphs = Array.from(editorContent.children);

    const paragraphContents = paragraphs.map((p) => p.outerHTML);

    console.log(paragraphContents);

    saveChapterMutation.mutate({
      title: chapterTitle,
      paragraphContents,
      story_id,
      chapter_id,
    });
  };

  const handleWriteClick = () => {
    // Get the parent node of the icon
    document.getElementById("editStory").contentEditable = false;

    const icon = document.querySelector(".AI-icon");
    const parentNode = icon.parentNode;

    // Create the wrapper div element
    const wrapper = document.createElement("section");

    wrapper.classList.add("ai-form-parent");

    // Render the AIForm component into the wrapper div element
    createRoot(wrapper).render(
      <AIForm
        userState={userState}
        storyState={storyState}
        sendGptPrompt={sendGptPrompt}
        contentEditable={false}
      />
    );

    console.log(parentNode);

    // Insert the wrapper element before the parentNode
    parentNode.insertAdjacentElement("beforebegin", wrapper);
  };

  const listener = (e) => {
    const editStory = document.getElementById("editStory");
    // get editStory's childs but not itself
    const filteredDivs = Array.from(editStory.children).filter(
      (child) => child.tagName === "P"
    );
    // whenever you click or enter, reset all the previous ones
    filteredDivs.map((div) => {
      const icon = div.querySelector(".AI-icon");
      if (icon) icon.parentNode.removeChild(icon);
    });
    filteredDivs.map((p) => (p.className = ""));

    if (e.key === "Enter") {
      // wait so that it recognizes the last element cursor is at
      setTimeout(() => {
        const selection = window.getSelection();
        const currentNode = selection.focusNode;
        currentNode.classList.add("active-paragraph");

        // Add the icon element to the currentNode
        const icon = document.createElement("div");
        icon.classList.add("AI-icon");
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
        icon.classList.add("AI-icon");
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
    const icon = document.querySelector(".AI-icon");

    if (icon && icon.contains(e.target)) {
      return;
    }

    if (formContainer && !formContainer.contains(e.target)) {
      const prevNode = formContainer.parentNode.nextElementSibling;
      console.log(prevNode);
      console.log(formContainer.parentNode);
      const formWrapper = formContainer.parentNode;
      formWrapper.parentNode.removeChild(formWrapper);
      prevNode.style.display = "block";
      document.getElementById("editStory").contentEditable = true;
    }
  };

  useEffect(() => {
    document.addEventListener("click", inputListener);
    window.addEventListener("click", listener);
    window.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("click", inputListener);
      window.removeEventListener("click", listener);
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <StyledWriting contentEditable={false}>
      <form
        onSubmit={handleSubmit}
        className="pageContainer"
        contentEditable={false}
      >
        <Navbar isChapterLoading={saveChapterMutation.isLoading} />
        <div id="writer-editor">
          <input
            id="editTitle"
            name="title"
            onChange={handleChange}
            value={chapterTitle}
            placeholder="story title..."
          />
          <hr
            style={{
              backgroundColor: "#6f6f6f",
              border: "none",
              height: "2px",
              width: "100%",
            }}
          />

          <div ref={editorRef} className="editable" id="editStory"></div>
        </div>
      </form>
    </StyledWriting>
  );
}

function AIForm({ sendGptPrompt, storyState, userState }) {
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("funny");
  const [length, setLength] = useState("5");
  const [response, setResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState("static");

  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const prevNode =
      document.querySelector(".ai-form-container").parentNode
        .nextElementSibling;

    setContent(prevNode.textContent.trim());

    // Hide the parentNode
    prevNode.style.display = "none";

    const input = document.querySelector("#prompt-input");
    input.focus();
  }, []);

  let source;
  console.log(source);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseStatus("loading");
    if (source) {
      source.close();
    }
    console.log("submitted");
    setResponse(""); // clear previous response

    const prompt = {
      style,
      length,
      content,
    };
    // Make a separate POST request to send the prompt

    await sendGptPrompt(prompt, userState.user._id);
    // Then initiate the EventSource
    source = new EventSource("/gpt/stream");

    source.onmessage = function (event) {
      setResponseStatus("answering");
      const json = event.data;
      if (json === "[DONE]") {
        source.close();
        setResponseStatus("done");
        return;
      }

      try {
        const chunk = JSON.parse(json);
        const content = chunk?.choices?.[0]?.delta?.content || "";
        setResponse((prevResponse) => prevResponse + content);
      } catch (err) {
        console.error("Error parsing JSON:", err);
      }
    };
  };

  const handleApplyClick = () => {
    const formContainer = document.querySelector(".ai-form-container");
    const prevNode = formContainer.parentNode.nextElementSibling;
    const formWrapper = formContainer.parentNode;
    formWrapper.parentNode.removeChild(formWrapper);
    prevNode.textContent = response;
    prevNode.style.display = "block";
    document.getElementById("editStory").contentEditable = true;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form
      onClick={handleFormClick}
      onSubmit={handleSubmit}
      className="ai-form-container ai"
    >
      <textarea
        type="text"
        id="prompt-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="edit-input"
        rows="3"
      />
      <div className="button-row">
        <button type="submit" className="orange-button btn">
          <FaRegPaperPlane />
        </button>
      </div>

      <div className="response">{response}</div>

      {responseStatus === "loading" && (
        <div className="ai-loading">
          <Discuss
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#ff6122"
          />
          <span>AI is thinking...</span>
        </div>
      )}

      {responseStatus !== "static" && responseStatus !== "loading" && (
        <div className="ai-buttons">
          <button
            type="button"
            onClick={handleApplyClick}
            className="orange-button btn"
          >
            Apply
          </button>
          <button type="submit" className="white-button btn">
            Retry
          </button>
        </div>
      )}

      <div className="options">
        <div className="length">
          <label htmlFor="length">Amount of sentences</label>
          <input
            value={length}
            onChange={(e) => setLength(e.target.value)}
            name="length"
            id="length"
            type="text"
            placeholder="type a number"
          />
        </div>
        <div className="style">
          <label htmlFor="language">Writing Style</label>
          <div id="language" style={{ width: "200px" }}>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              name="style"
            >
              <option value="funny">Funny</option>
              <option value="descriptive">Descriptive</option>
              <option value="emotional">Emotional</option>
              <option value="persuasive">Persuasive</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Writing;
