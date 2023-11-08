import { UserCard } from "../../../components";
import { useOutletContext } from "react-router-dom";
import StyledFollowing from "./styles/Following.styled";
import { RiUserFollowFill } from "react-icons/ri";

function Following() {
  const { profileData } = useOutletContext();

  return (
    <StyledFollowing>
      {profileData.profile.following.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <RiUserFollowFill />
          </div>
          <div className="text">This user doesn't follow anybody.</div>
        </div>
      ) : (
        <>
          {profileData.profile.following?.map((f) => {
            return (
              <div key={f._id} className="user">
                <UserCard user={f} />
              </div>
            );
          })}
        </>
      )}
    </StyledFollowing>
  );
}

export default Following;
