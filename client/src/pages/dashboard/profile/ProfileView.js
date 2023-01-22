import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/appContext";
import "../../../assets/ProfileView.css";

function ProfileView() {
  const { reducerState, getUser } = useContext(AppContext);
  const { username } = useParams();

  useEffect(() => {
    getUser(username);
  }, []);

  return (
    <div id="profile-view">
      <div className="avatar">
        <img src="" alt="" />
      </div>
      <h1 id="username">{reducerState.user.name}</h1>

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
