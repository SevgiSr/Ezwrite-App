import { useContext } from "react";
import { UserCard } from "../../../components";
import { ProfileContext } from "../../../context/profileContext";

function Following() {
  const { profileState } = useContext(ProfileContext);
  return (
    <div id="following" style={{ padding: "20px" }}>
      {profileState.profile?.following?.map((f) => {
        return <UserCard user={f} />;
      })}
    </div>
  );
}

export default Following;
