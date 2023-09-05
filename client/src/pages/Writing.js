import { useEffect, useRef, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { AIForm, Navbar } from "../components";
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
import "../assets/edited-beagle.css";
import { MyForkContext } from "../context/myForkContext";

function Writing() {
  const queryClient = useQueryClient();
  //dont change chapterBody at each typed character or cursor gets messed up - no onInput(aka. onChange)
  //just use it for saving and first loading times
  const [chapterBody, setChapterBody] = useState("Type the text...");
  const [chapterTitle, setChapterTitle] = useState("");
  const [myWork, setMyWork] = useState("");
  const {
    storyState,
    getMyStories,
    setEditChapter,
    sendGptPrompt,
    useSaveChapter,
  } = useContext(MyStoryContext);

  const { forkState, getMyForks, useSaveForkChapter, setEditForkChapter } =
    useContext(MyForkContext);

  const { userState } = useContext(UserContext);
  const { story_id, fork_id, chapter_id } = useParams();
  const location = useLocation();

  const editorRef = useRef(null);

  useEffect(() => {
    const editor = new MediumEditor(editorRef.current, {
      toolbar: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "justifyLeft",
          "justifyCenter",
          "justifyRight",
        ],
      },
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
  const saveForkChapterMutation = useSaveForkChapter();

  useEffect(() => {
    if (location.pathname.split("/")[1] === "myworks") {
      setMyWork("story");
      console.log("STORY");
    } else if (location.pathname.split("/")[1] === "myforks") {
      setMyWork("fork");
      console.log("FORK");
    }
  }, [location]);

  const {
    data: myStories = [],
    isLoading,
    isFetching,
    status,
  } = useQuery(["myStories"], getMyStories, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: location.pathname.split("/")[1] === "myworks",
  });

  const {
    data: myForks = [],
    isLoading: isForkLoading,
    isFetching: isForkFetching,
    status: forkStatus,
  } = useQuery(["myForks"], getMyForks, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: location.pathname.split("/")[1] === "myforks",
  });

  useEffect(() => {
    if (myWork === "fork") {
      if (!isForkFetching && forkStatus === "success") {
        console.log("setting fork");
        const myFork = myForks.find((fork) => fork._id === fork_id);
        const chapter = myFork.chapters.find(
          (chapter) => chapter._id === chapter_id
        );
        setChapterTitle(chapter.title);
        const editor = document.getElementById("editStory");
        editor.innerHTML = chapter.content;
        // Focus on the editor if there is initial content
        if (chapter.content.trim() !== "") {
          editor.focus();
        }
        setEditForkChapter(myFork.story, myFork.chapters, chapter);
      }
    }
  }, [location, isForkFetching, myWork]);

  useEffect(() => {
    if (myWork === "story") {
      if (!isFetching && status === "success") {
        console.log("setting story");
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
        setEditChapter(myStory, myStory.chapters, chapter);
      }
    }
  }, [location, isFetching, myWork]);

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

    if (myWork === "story") {
      saveChapterMutation.mutate({
        title: chapterTitle,
        paragraphContents,
        story_id,
        chapter_id,
      });
    } else if (myWork === "fork") {
      saveForkChapterMutation.mutate({
        title: chapterTitle,
        paragraphContents,
        fork_id,
        chapter_id,
      });
    }
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

export default Writing;
