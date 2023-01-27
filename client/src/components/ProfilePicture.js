import src from "../assets/pp.png";
import StyledProfilePicture from "./styles/ProfilePicture.styled";

const ProfilePicture = ({ width, height }) => {
  return (
    <StyledProfilePicture width={width} height={height}>
      <img src={src} alt="profile" />
    </StyledProfilePicture>
  );
};

export default ProfilePicture;
