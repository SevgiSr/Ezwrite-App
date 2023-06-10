import { UserCard } from "../../../components";
import { useOutletContext } from "react-router-dom";
import StyledFollowing from "./styles/Following.styled";

function Following() {
  const { profileData } = useOutletContext();

  return (
    <StyledFollowing>
      <div className="following-parent" style={{ padding: "20px" }}>
        {profileData.profile.following?.map((f) => {
          return (
            <div key={f._id} className="user">
              <UserCard user={f} />
            </div>
          );
        })}
      </div>
    </StyledFollowing>
  );
}

export default Following;
