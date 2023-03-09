import { Outlet, useParams } from "react-router-dom";
import ProfileView from "./ProfileView";
import { ProfileNavbar } from "../../../components";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../../../context/profileContext";
import EditProfile from "./EditProfile";
import { useState } from "react";
function SharedLayout() {
  const { profileState, getProfile } = useContext(ProfileContext);
  const [profileInfo, setProfileInfo] = useState({
    profileName: "",
    pronouns: "",
    about: "",
    website: "",
    location: "",
  });

  const { username } = useParams();

  //make backend request on first render
  useEffect(() => {
    getProfile(username);
  }, [username]);

  const { profileName, pronouns, about, website, location } =
    profileState.profile;
  const newState = {
    profileName,
    pronouns,
    about,
    website,
    location,
  };

  // each time reducer changes update local state
  useEffect(() => {
    setProfileInfo(newState);
  }, [profileState.profile]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  return (
    <>
      <ProfileView handleChange={handleChange} state={profileInfo} />
      <ProfileNavbar
        links={[
          { to: "", label: "About" },
          { to: "conversations", label: "Conversations" },
          { to: "following", label: "Following" },
          { to: "activity", label: "Activity" },
        ]}
      />
      {profileState.isMainUser ? (
        profileState.isEditMode ? (
          <EditProfile handleChange={handleChange} state={profileInfo} />
        ) : (
          <Outlet />
        )
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default SharedLayout;
