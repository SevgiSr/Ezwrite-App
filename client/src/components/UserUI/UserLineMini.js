import { Link } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";
import StyledUserLine from "../styles/UserLine.styled";

function UserLineMini({ user }) {
  return (
    <StyledUserLine>
      <div className="flex-item">
        <ProfilePicture filename={user._id} width="35px" />
      </div>
      <div className="flex-item">
        <Link to={`/user/${user.name}`} className="name">
          {user.name}
        </Link>
      </div>
    </StyledUserLine>
  );
}

export default UserLineMini;