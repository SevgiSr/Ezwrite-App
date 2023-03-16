import { useContext, useEffect, useState } from "react";
import src0 from "../assets/pp.png";
import { ProfileContext } from "../context/profileContext";
import StyledProfilePicture from "./styles/ProfilePicture.styled";

const ProfilePicture = ({ width, height, filename, timestamp }) => {
  const imageUrl = `/images/${filename}?t=${timestamp}`;
  return (
    <StyledProfilePicture width={width} height={height}>
      <img src={imageUrl} alt="profile" />
    </StyledProfilePicture>
  );
};

export default ProfilePicture;
