import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { Alert, FormRow } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledNewStory from "./styles/NewStory.styled";
import OrangeLinks from "../components/OrangeLinks";

function NewStory() {
  const navigate = useNavigate();
  const { storyState, createStory } = useContext(MyStoryContext);
  const [storyDetails, setStoryDetails] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setStoryDetails({ ...storyDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createStory(storyDetails);
    navigate("/myStories");
  };

  return (
    <StyledNewStory>
      {storyState.showAlert && <Alert />}
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* <label htmlFor="cover">Upload Image</label>
        <input id="cover" type="file" name="cover" /> */}
        <OrangeLinks links={[{ label: "Story Details", to: "" }]} />

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
