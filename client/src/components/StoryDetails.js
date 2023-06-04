import { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiFillPicture, AiOutlinePlus } from "react-icons/ai";
import StyledStoryDetails from "./styles/StoryDetails.styled";

const StoryDetails = ({
  storyDetails,
  tags,
  setStoryDetails,
  setTags,
  handleSubmit,
  submitButton,
  title,
}) => {
  const handleChange = (e) => {
    setStoryDetails({ ...storyDetails, [e.target.name]: e.target.value });
  };

  //to prevent submitting
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <StyledStoryDetails>
      <form
        id="story-details"
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {title}
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
            <select
              onChange={handleChange}
              name="category"
              value={storyDetails.category}
            >
              <option value="0">Select a category:</option>
              <option value="fantasy">Fantasy</option>
              <option value="romance">Romance</option>
              <option value="action">Action</option>
              <option value="horror">Horror</option>
              <option value="mystery">Mystery</option>
              <option value="paranormal">Paranormal</option>
              <option value="vampire">Vampire/Werewolf</option>
              <option value="educational">Educational</option>
              <option value="debate">Debate</option>
              <option value="humor">Humor</option>
              <option value="nonFiction">Non-fiction</option>
            </select>
          </div>
        </div>
        <TagsField tags={tags} setTags={setTags} />
        <div className="item language">
          <label htmlFor="language">Language</label>
          <div id="language" style={{ width: "200px" }}>
            <select
              onChange={handleChange}
              name="language"
              value={storyDetails.language}
            >
              <option value="english">English</option>
              <option value="turkish">Turkish</option>
              <option value="russian">Russian</option>
            </select>
          </div>
        </div>
        {submitButton}
      </form>
    </StyledStoryDetails>
  );
};

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
        {tags?.map((tag, index) => (
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

export default StoryDetails;
