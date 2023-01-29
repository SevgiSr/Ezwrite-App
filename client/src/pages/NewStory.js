import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { Alert, FormRow } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <div className="container">
      {storyState.showAlert && <Alert />}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* <label htmlFor="cover">Upload Image</label>
        <input id="cover" type="file" name="cover" /> */}
        <FormRow
          type="text"
          name="title"
          value={storyDetails.title}
          handleChange={handleChange}
        />
        <textarea
          name="description"
          onChange={handleChange}
          value={storyDetails.description}
          id=""
          cols="30"
          rows="10"
        />
        <div className="custom-select" style={{ width: "200px" }}>
          <select onChange={handleChange} name="category">
            <option value="0">Select a category:</option>
            <option value="action">Action</option>
            <option value="scienceFiction">Science Fiction</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewStory;
