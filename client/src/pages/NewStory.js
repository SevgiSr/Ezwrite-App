import { useContext, useEffect, useRef } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { Alert, FormRow, LoadingScreen } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledNewStory from "./styles/NewStory.styled";
import OrangeLinks from "../components/OrangeLinks";
import { ProfileContext } from "../context/profileContext";
import { AiFillPicture } from "react-icons/ai";
import StoryDetails from "../components/StoryDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function NewStory() {
  const queryClient = useQueryClient();

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

  const [imageUrl, setImageUrl] = useState("");

  const mutation = useMutation(
    (data) => createStory(data.cover, data.storyDetails),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`myStories`]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    storyDetails.tags = tags;

    navigate("/myStories", { isCreating: mutation.status });
    mutation.mutateAsync({ cover, storyDetails });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <StyledNewStory>
      {storyState.showAlert && <Alert />}
      <div className="cover">
        {imageUrl ? (
          <div
            className="cover-img"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        ) : (
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
        )}
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
            <button className="create-btn orange-button btn" type="submit">
              Create
            </button>
          }
        />
      </div>
    </StyledNewStory>
  );
}

export default NewStory;
