import { UserCard } from "../../../components";
import { useOutletContext } from "react-router-dom";

function Following() {
  const { profileData } = useOutletContext();

  return (
    <div id="following" style={{ padding: "20px" }}>
      {profileData.profile.following?.map((f) => {
        return <UserCard key={f._id} user={f} />;
      })}
    </div>
  );
}

export default Following;
