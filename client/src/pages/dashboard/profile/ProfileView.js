import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../../context/profileContext";
import StyledProfileView from "./styles/ProfileView.styled";
import ProfilePicture from "../../../components/ProfilePicture";

function ProfileView({ handleChange, state }) {
  const { profileState, closeEditMode, getProfile } =
    useContext(ProfileContext);
  const { username } = useParams();
  const handleClick = () => {
    closeEditMode();
    //you normally dont need that because if sharedLayout sets reducer on first render it affects all children too
    //it's for bringing original fields back since u canceled them
    getProfile(username);
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

      <ProfilePicture width="90px" />

      <h1 className="profile-name">
        <span>{profileState.profile.profileName}</span>
        {profileState.isEditMode && (
          <input
            type="text"
            name="profileName"
            value={state.profileName}
            onChange={handleChange}
          />
        )}
      </h1>

      <h2 id="username">@{profileState.profile.name}</h2>

      <ul id="user-info">
        <li>
          <p>0</p>
          <p>works</p>
        </li>
        <li>
          <p>1</p>
          <p>reading lists</p>
        </li>
        <li>
          <p>0</p>
          <p>followers</p>
        </li>
      </ul>
    </StyledProfileView>
  );
}

export default ProfileView;
