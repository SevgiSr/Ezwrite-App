import { useContext, useEffect, useRef } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { Alert, FormRow } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledNewStory from "./styles/NewStory.styled";
import OrangeLinks from "../components/OrangeLinks";
import { ProfileContext } from "../context/profileContext";
import { AiFillPicture } from "react-icons/ai";
import StoryDetails from "../components/StoryDetails";

function NewStory() {
  const navigate = useNavigate();
  const { storyState, createStory } = useContext(MyStoryContext);

  const [storyDetails, setStoryDetails] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
  });

  const [tags, setTags] = useState([]);

  const [cover, setCover] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    storyDetails.tags = tags;
    createStory(cover, storyDetails);

    navigate("/myStories");
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
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
      <div className="details">
        <StoryDetails
          storyDetails={storyDetails}
          tags={tags}
          setStoryDetails={setStoryDetails}
          setTags={setTags}
          handleSubmit={handleSubmit}
          title={<h1>Story Details</h1>}
          submitButton={
            <button className="create-btn btn" type="submit">
              Create
            </button>
          }
        />
      </div>
    </StyledNewStory>
  );
}

export default NewStory;
