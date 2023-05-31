import { Outlet, useParams } from "react-router-dom";
import ProfileView from "./ProfileView";
import { LoadingScreen, ProfileNavbar } from "../../../components";
import { useContext } from "react";
import { ProfileContext } from "../../../context/profileContext";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";

function SharedLayout() {
  const { profileState, getProfile, getProfileConv } =
    useContext(ProfileContext);
  const [profileInfo, setProfileInfo] = useState({
    profileName: "",
    pronouns: "",
    about: "",
    website: "",
    location: "",
  });

  const { username } = useParams();

  const {
    data: profileData = {},
    isLoading,
    refetch,
  } = useQuery(["profile", username], () => getProfile(username), {
    onSuccess: (data) => {
      const { profileName, pronouns, about, website, location } = data.profile;
      const newState = {
        profileName,
        pronouns,
        about,
        website,
        location,
      };
      setProfileInfo(newState);
    },
  });

  const { data: convs = [] } = useQuery(
    ["conversations", username],
    () => getProfileConv(username),
    {
      enabled: !!profileData,
    }
  );

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <>
      <ProfileView
        handleChange={handleChange}
        state={profileInfo}
        profileData={profileData}
        refetch={refetch}
      />
      <ProfileNavbar
        profileData={profileData}
        links={[
          { to: "", label: "About" },
          { to: "conversations", label: "Conversations" },
          { to: "following", label: "Following" },
          { to: "activity", label: "Activity" },
        ]}
      />
      {profileData.isMainUser ? (
        profileState.isEditMode ? (
          <EditProfile handleChange={handleChange} state={profileInfo} />
        ) : (
          <Outlet context={{ profileData, convs }} />
        )
      ) : (
        <Outlet context={{ profileData, convs }} />
      )}
    </>
  );
}

export default SharedLayout;
