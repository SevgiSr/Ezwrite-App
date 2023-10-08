import { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { Discuss } from "react-loader-spinner";

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
        <button type="submit" className="btn btn-main">
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
            className="btn btn-main"
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

export default AIForm;
