import { useContext, useState } from "react";
import { ProfileContext } from "../../../context/profileContext";
import StyledEditProfile from "./styles/EditProfile.styled";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "../../../context/userContext";

function EditProfile({ handleChange, state }) {
  const { useEditProfileInfo, closeEditMode } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);

  const editProfileInfoMutation = useEditProfileInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeEditMode();
    await editProfileInfoMutation.mutateAsync({
      state,
      username: userState.user.name,
    });
  };

  return (
    <StyledEditProfile>
      <form id="edit-profile" onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="pronouns">Pronouns</label>
          <div id="pronouns">
            <select
              value={state.pronouns}
              onChange={handleChange}
              name="pronouns"
            >
              <option value="0">0</option>
              <option value="She/Her">She/Her</option>
              <option value="He/Him">He/Him</option>
              <option value="They/Them">They/Them</option>
            </select>
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="about">About</label>
          <textarea
            name="about"
            value={state.about}
            id="about"
            onChange={handleChange}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="form-item">
          <label htmlFor="website">My Website</label>
          <input
            id="website"
            name="website"
            value={state.website}
            onChange={handleChange}
            label="Enter a link to your personal website"
            type="text"
          />
        </div>
        <div className="form-item">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            value={state.location}
            onChange={handleChange}
            label="Enter your location"
            type="text"
          />
        </div>
      </form>
    </StyledEditProfile>
  );
}

export default EditProfile;
