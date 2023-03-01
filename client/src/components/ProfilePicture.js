import { useContext, useEffect, useState } from "react";
import src0 from "../assets/pp.png";
import { ProfileContext } from "../context/profileContext";
import StyledProfilePicture from "./styles/ProfilePicture.styled";

const ProfilePicture = ({ width, height, filename }) => {
  return (
    <StyledProfilePicture width={width} height={height}>
      <img src={`/images/${filename}`} alt="profile" />
    </StyledProfilePicture>
  );
};

export default ProfilePicture;
