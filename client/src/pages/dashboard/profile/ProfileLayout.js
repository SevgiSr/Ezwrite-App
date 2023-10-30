import { Outlet, useParams } from "react-router-dom";
import ProfileView from "./ProfileView";
import { LoadingScreen, ProfileNavbar } from "../../../components";
import { useContext } from "react";
import { ProfileContext } from "../../../context/profileContext";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import StyledProfileLayout from "./styles/ProfileLayout.styled";

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
      if (data.isMainUser) {
        const { profileName, pronouns, about, website, location } =
          data.profile;
        const newState = {
          profileName,
          pronouns,
          about,
          website,
          location,
        };
        setProfileInfo(newState);
      }
    },
    refetchOnWindowFocus: false,
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
    return <LoadingScreen />;
  }

  return (
    <StyledProfileLayout>
      <ProfileView
        handleChange={handleChange}
        state={profileInfo}
        profileData={profileData}
        refetch={refetch}
      />
      <ProfileNavbar
        profileData={profileData}
        links={[
          { to: "", label: "About", className: "profile-nav-link" },
          {
            to: "posts/",
            label: "Posts",
            className: "profile-nav-link",
          },
          {
            to: "following/",
            label: "Following",
            className: "profile-nav-link",
          },
          { to: "activity/", label: "Activity", className: "profile-nav-link" },
        ]}
      />
      {profileData.isMainUser ? (
        // we have dispatches that changes edit mode. edit mode is in global state
        profileState.isEditMode ? (
          <EditProfile handleChange={handleChange} state={profileInfo} />
        ) : (
          <div className="outlet">
            <Outlet context={{ profileData, convs }} />
          </div>
        )
      ) : (
        <div className="outlet">
          <Outlet context={{ profileData, convs }} />
        </div>
      )}
    </StyledProfileLayout>
  );
}

export default SharedLayout;
