import { Link } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";
import StyledUserLine from "../styles/UserLine.styled";

function UserLineMini({ user, width, fontSize }) {
  return (
    <StyledUserLine>
      <div className="flex-item">
        <ProfilePicture filename={user._id} width={width ? width : "35px"} />
      </div>
      <div className="flex-item">
        <Link to={`/user/${user.name}`} className="name" style={{ fontSize }}>
          {user.name}
        </Link>
      </div>
    </StyledUserLine>
  );
}

export default UserLineMini;
