import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../../context/profileContext";
import StyledProfileView from "./styles/ProfileView.styled";
import ProfilePicture from "../../../components/ProfilePicture";
import { FaCamera } from "react-icons/fa";
import { useRef } from "react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

function ProfileView({ handleChange, state }) {
  const {
    profileState,
    alertState,
    closeEditMode,
    getProfile,
    uploadImage,
    uploadBcImage,
    displayImage,
  } = useContext(ProfileContext);
  const { username } = useParams();

  const handleClick = () => {
    closeEditMode();
    //you normally dont need that because if sharedLayout sets reducer on first render it affects all children too
    //it's for bringing original fields back since u canceled them
    getProfile(username);
  };

  const handleUploadChange = (e) => {
    uploadImage(e.target.files[0]);
  };

  const handleBcUploadChange = (e) => {
    uploadBcImage(e.target.files[0]);
  };

  const inputRef = useRef(null);

  const editedHandleChange = (e) => {
    //handle change as component parameter, from profile layout
    handleChange(e);
    const inputText = e.target.value;
    const textWidth = inputText.length * 12; // adjust the factor as needed
    inputRef.current.style.width = textWidth + "px";
  };

  return (
    <StyledProfileView>
      {profileState.isEditMode && (
        <div className="edit-mode">
          <nav>
            <button className="orange-button" form="edit-profile" type="submit">
              Save Changes
            </button>
            <button className="white-button" onClick={handleClick}>
              Cancel Changes
            </button>
          </nav>
          <div id="edit-overlay"></div>
        </div>
      )}

      <div className="bc-overlay"></div>

      <div className="background">
        <img src={`/images/background/${profileState.profile._id}`} alt="" />
      </div>

      {profileState.isEditMode && (
        <label htmlFor="upload" className="upload-background">
          <div className="upload-button">
            <div className="icon">
              <FaCamera />
            </div>
            Change Background Image
          </div>
          <input
            id="upload"
            type="file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            name="file"
            onChange={handleBcUploadChange}
          />
        </label>
      )}

      <div className="profile-picture">
        {profileState.isEditMode && (
          <label htmlFor="upload" className="upload-picture">
            <div className="icon">
              <FaCamera />
            </div>
            <input
              id="upload"
              type="file"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              name="file"
              onChange={handleUploadChange}
            />
          </label>
        )}
        {alertState.isLoading ? (
          <PulseLoader />
        ) : (
          <ProfilePicture
            filename={profileState.profile._id}
            width="90px"
            height="90px"
          />
        )}
      </div>

      <h1 className="profile-name">
        <span>{profileState.profile.profileName}</span>
        {profileState.isEditMode && (
          <input
            ref={inputRef}
            type="text"
            name="profileName"
            value={state.profileName}
            onChange={editedHandleChange}
          />
        )}
      </h1>

      <h2 className="username">@{profileState.profile.name}</h2>

      <ul id="user-info">
        <li>
          <button className="info-btn">
            <p>0</p>
            <p>works</p>
          </button>
        </li>
        <li>
          <button className="info-btn">
            <p>1</p>
            <p>reading lists</p>
          </button>
        </li>
        <li>
          <button className="info-btn">
            <p>{profileState.profile.followers?.length}</p>
            <p>followers</p>
          </button>
        </li>
      </ul>
    </StyledProfileView>
  );
}

export default ProfileView;
