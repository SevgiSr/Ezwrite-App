import { useContext, useEffect, useState } from "react";
import src0 from "../assets/pp.png";
import { ProfileContext } from "../context/profileContext";
import StyledProfilePicture from "./styles/ProfilePicture.styled";
import src from "./Default.webp";

const ProfilePicture = ({ width, filename, timestamp }) => {
  const imageUrl = `/api/images/${filename}?t=${timestamp}`;

  return (
    <StyledProfilePicture width={width}>
      <img
        src={imageUrl}
        alt="profile"
        onError={(event) => {
          event.target.src = src;
          event.onerror = null;
        }}
      />
    </StyledProfilePicture>
  );
};

export default ProfilePicture;
