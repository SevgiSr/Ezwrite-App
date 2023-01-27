import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../../context/profileContext";
import "../../../assets/ProfileView.css";

function ProfileView() {
  const { profileState, getProfile } = useContext(ProfileContext);
  const { username } = useParams();

  useEffect(() => {
    getProfile(username);
  }, []);

  return (
    <div id="profile-view">
      <div className="avatar">
        <img src="" alt="" />
      </div>
      <h1 id="username">{profileState.profile.name}</h1>

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
    </div>
  );
}

export default ProfileView;
