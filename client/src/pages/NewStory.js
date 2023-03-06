import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { Alert, FormRow } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledNewStory from "./styles/NewStory.styled";
import OrangeLinks from "../components/OrangeLinks";
import { ProfileContext } from "../context/profileContext";
import { AiFillPicture } from "react-icons/ai";

function NewStory() {
  const navigate = useNavigate();
  const { storyState, createStory, uploadCover } = useContext(MyStoryContext);

  const [storyDetails, setStoryDetails] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [cover, setCover] = useState("");

  const handleChange = (e) => {
    setStoryDetails({ ...storyDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createStory(cover, storyDetails);

    navigate("/myStories");
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  return (
    <StyledNewStory>
      {storyState.showAlert && <Alert />}

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
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* <label htmlFor="cover">Upload Image</label>
        <input id="cover" type="file" name="cover" /> */}
        <h1>Story Details</h1>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={storyDetails.title}
          onChange={handleChange}
        />
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          name="description"
          onChange={handleChange}
          value={storyDetails.description}
          cols="30"
          rows="10"
        />
        <label htmlFor="category">Category</label>
        <div id="category" style={{ width: "200px" }}>
          <select onChange={handleChange} name="category">
            <option value="0">Select a category:</option>
            <option value="action">Action</option>
            <option value="scienceFiction">Science Fiction</option>
          </select>
        </div>
        <button className=" create-btn btn" type="submit">
          Create
        </button>
      </form>
    </StyledNewStory>
  );
}

export default NewStory;
