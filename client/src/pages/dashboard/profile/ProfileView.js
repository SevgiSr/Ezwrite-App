import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/appContext";

function ProfileView() {
  const { reducerState, getUser } = useContext(AppContext);
  const { username } = useParams();

  useEffect(() => {
    getUser(username);
  }, []);

  return (
    <div className="container">
      <h1>lelell</h1>
      <h1>{reducerState.user.name}</h1>
    </div>
  );
}

export default ProfileView;
