import { useContext } from "react";
import { MyStoryContext } from "../context/myStoryContext";
import { Alert, StoryDetails } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import StyledNewStory from "./styles/NewStory.styled";
import { AiFillPicture } from "react-icons/ai";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

function NewStory() {
  const navigate = useNavigate();
  const { storyState, useCreateStory, alertState, showErrorAlert } =
    useContext(MyStoryContext);

  const createStoryMutation = useCreateStory();

  const [storyDetails, setStoryDetails] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
  });

  const [tags, setTags] = useState([]);

  const [cover, setCover] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(storyDetails.title, storyDetails.category);
    if (!storyDetails.title || !storyDetails.category || !cover) {
      showErrorAlert("Please fill in title category and cover fields.");
      return;
    }

    storyDetails.tags = tags;
    navigate("/workspace/myStories/");
    createStoryMutation.mutateAsync({ cover, storyDetails });
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
      <Navbar />
      <div className="new-story-container">
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
            title="Story Details"
            submitButton={
              <button className="create-btn btn btn-main" type="submit">
                Create
              </button>
            }
          />
        </div>
      </div>
      <Alert state={alertState} />
    </StyledNewStory>
  );
}

function Navbar() {
  const navigate = useNavigate();
  return (
    <StyledNavbar>
      <section>
        <Link to="/workspace/myStories/" className="back-btn">
          <div className="icon">
            <IoIosArrowBack />
          </div>
        </Link>

        <div className="new-story-card">
          <div className="new-cover"></div>
          <div className="new-story-title">New Story</div>
        </div>
      </section>
      <div className="buttons">
        <button
          className="btn btn-gray"
          onClick={() => navigate("/workspace/myStories/")}
        >
          Cancel
        </button>
      </div>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 5px 20px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--background2);
  background-color: var(--background3);

  section {
    display: flex;
    align-items: center;
    .back-btn {
      pointer-events: fill;
      .icon {
        color: var(--font1);
        font-size: 30px;
        margin-right: 10px;
      }
    }
    .new-story-card {
      display: flex;
      align-items: center;
      justify-content: start;
      background-color: var(--background3);
      color: var(--font2);
      .new-cover {
        width: 40px;
        height: calc(40px * (125 / 80));
        background-color: #6f6f6f;
      }

      .new-story-title {
        cursor: pointer;
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
`;

export default NewStory;
