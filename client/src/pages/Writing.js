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
  } = useContext(MyStoryContext);
  const { userState } = useContext(UserContext);
  const { story_id, chapter_id } = useParams();
  const location = useLocation();

  const contentEditableRef = useRef(null);

  const handleChange = (e) => {
    setChapterTitle(e.target.value);
  };

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
      setChapterBody(chapter.content);
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

  const mutation = useMutation(
    (data) =>
      saveChapter(data.chapter, data.divArray, data.story_id, data.chapter_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myStories"]);
      },
    }
  );

  //saves in the backend and also cuz reducer's chapter changed useeffect gonna set it on frontend
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = document.getElementById("editStory").innerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const divElements = Array.from(doc.querySelectorAll("div"));

    const divArray = divElements.map((div) => he.decode(div.outerHTML));

    const chapter = {
      title: chapterTitle,
      content: content,
    };
    mutation.mutate({ chapter, divArray, story_id, chapter_id });
  };

  const handlePublishClick = () => {
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
    const icon = document.querySelector(".AI-icon");
    const parentNode = icon.parentNode;
    console.log(parentNode);

    // Create the wrapper div element
    const wrapper = document.createElement("div");

    // Render the AIForm component into the wrapper div element
    createRoot(wrapper).render(
      <AIForm
        userState={userState}
        storyState={storyState}
        sendGptPrompt={sendGptPrompt}
      />
    );

    // Insert the wrapper element before the parentNode
    parentNode.insertAdjacentElement("beforebegin", wrapper);
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
      const icon = div.querySelector(".AI-icon");
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
        <Navbar isChapterLoading={mutation.isLoading} />
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

function AIForm({ sendGptPrompt, storyState, userState }) {
  const [content, setContent] = useState("");
  const [style, setStyle] = useState("funny");
  const [length, setLength] = useState("5");
  const [response, setResponse] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    var source = new EventSource("/gpt/stream");

    source.onmessage = function (event) {
      const json = event.data;
      if (json === "[DONE]") {
        source.close();
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ai-form-container ai">
      <div className="flex-row">
        <input
          type="text"
          id="prompt-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="edit-input"
        />
        <button type="submit">
          <FaRegPaperPlane />
        </button>
      </div>
      <div className="response">{response}</div>
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
