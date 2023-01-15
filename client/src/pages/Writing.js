import "../assets/Writing.css";
import { useEffect, useState } from "react";
import { handleKeyDown } from "../utils/handleKeyDown";
import { Navbar } from "../components";

function Writing() {
  const [story, setStory] = useState({ body: "", title: "" });

  const handleChange = (e) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };

  return (
    <div className="pageContainer">
      <Navbar />
      <div className="storyContainer">
        <input
          id="editTitle"
          name="title"
          onChange={handleChange}
          value={story.title}
          placeholder="story title..."
        />
        <hr style={{ color: "gray", width: "60%" }} />
        <textarea
          id="editStory"
          name="body"
          onChange={handleChange}
          value={story.body}
          onKeyDown={handleKeyDown}
          placeholder="Type your text..."
        />
      </div>
    </div>
  );
}

export default Writing;
