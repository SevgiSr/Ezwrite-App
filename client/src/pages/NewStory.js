import { useContext, useEffect, useRef } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { Alert, FormRow } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledNewStory from "./styles/NewStory.styled";
import OrangeLinks from "../components/OrangeLinks";
import { ProfileContext } from "../context/profileContext";
import { AiFillPicture, AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

function NewStory() {
  const navigate = useNavigate();
  const { storyState, createStory, uploadCover } = useContext(MyStoryContext);

  const [storyDetails, setStoryDetails] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
  });
  const [tags, setTags] = useState([]);

  const [cover, setCover] = useState("");

  const handleChange = (e) => {
    setStoryDetails({ ...storyDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storyDetails.tags = tags;
    createStory(cover, storyDetails);

    navigate("/myStories");
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  //to prevent submitting
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <StyledNewStory>
      {storyState.showAlert && <Alert />}
      <div className="cover">
        <label htmlFor="upload" className="upload-picture">
          <div className="label">
            <AiFillPicture />
            <span>Add a cover</span>
          </div>
          <input
            id="upload"
            type="file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            name="file"
            onChange={handleCoverChange}
          />
        </label>
      </div>
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* <label htmlFor="cover">Upload Image</label>
        <input id="cover" type="file" name="cover" /> */}
        <h1>Story Details</h1>
        <div className="item title">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={storyDetails.title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="item description">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="description"
            onChange={handleChange}
            value={storyDetails.description}
            cols="30"
            rows="10"
          />
        </div>
        <div className="item category">
          <label htmlFor="category">Category</label>
          <div id="category" style={{ width: "200px" }}>
            <select onChange={handleChange} name="category">
              <option value="0">Select a category:</option>
              <option value="action">Action</option>
              <option value="scienceFiction">Science Fiction</option>
            </select>
          </div>
        </div>
        <TagsField tags={tags} setTags={setTags} />
        <div className="item language">
          <label htmlFor="language">Language</label>
          <div id="language" style={{ width: "200px" }}>
            <select onChange={handleChange} name="language">
              <option value="english">English</option>
              <option value="turkish">Turkish</option>
              <option value="russian">Russian</option>
            </select>
          </div>
        </div>
        <button className="create-btn btn" type="submit">
          Create
        </button>
      </form>
    </StyledNewStory>
  );
}

function TagsField({ tags, setTags }) {
  const [tagInputVisible, setTagInputVisible] = useState(false);

  const tagInputRef = useRef(null);

  const handleAddTag = () => {
    setTagInputVisible(true);
    setTimeout(() => {
      tagInputRef.current.focus();
    }, 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTags = event.target.value.trim().split(" ");
      if (newTags.length) {
        setTags([...tags, ...newTags]);
        event.target.value = "";
        setTagInputVisible(false);
      }
    }
  };

  const handleRemoveTagClick = (index) => {
    const newTags = tags;
    newTags.splice(index, 1);
    setTags([...newTags]);
  };

  return (
    <div className="item tags">
      <label htmlFor="tags">Tags</label>
      <div className="tags-items">
        {tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span>{tag}</span>
            <span
              className="delete-tag icon"
              onClick={(e) => handleRemoveTagClick(index)}
            >
              <RxCross1 />
            </span>
          </div>
        ))}
      </div>

      {tagInputVisible ? (
        <input
          id="tags"
          className="tag-input"
          ref={tagInputRef}
          type="text"
          placeholder="Separate tags with a space"
          onKeyDown={handleKeyDown}
        />
      ) : (
        <button className="tag-btn" onClick={handleAddTag}>
          <span>Add a tag</span>
          <span className="icon">
            <AiOutlinePlus />
          </span>
        </button>
      )}
    </div>
  );
}

export default NewStory;
