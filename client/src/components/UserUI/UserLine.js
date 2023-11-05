import { Link } from "react-router-dom";
import ProfilePicture from "../ProfilePicture";
import StyledUserLine from "../styles/UserLine.styled";
import { useState } from "react";
import { useEffect } from "react";

function UserLine({ user, width }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledUserLine>
      <div className="flex-item">
        <ProfilePicture filename={user._id} width={width ? width : "35px"} />
      </div>
      <div className="flex-item">
        <Link to={`/user/${user.name}`} className="name">
          {user.name}
        </Link>
        {windowWidth > 540 && (
          <div className="details">
            Followers: {user.followers.length} • Works: {user.stories.length}
          </div>
        )}
      </div>
    </StyledUserLine>
  );
}

export default UserLine;
