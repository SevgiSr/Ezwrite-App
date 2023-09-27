import { useContext } from "react";
import StyledCollaborations from "./styles/Collaborations.styled";
import { MyForkContext } from "../../context/myForkContext";
import { useQuery } from "@tanstack/react-query";
import { CollabRequest, PullRequest } from "../../components";
import { MdOutlineGroupOff } from "react-icons/md";
import { UserContext } from "../../context/userContext";

function Collaborations() {
  const { getCollabNotifications } = useContext(MyForkContext);
  const { userState } = useContext(UserContext);
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["collab", "notifications"],
    queryFn: () => getCollabNotifications(),
    refetchOnWindowFocus: false,
  });
  console.log(notifications);
  if (isLoading) return null;
  return (
    <StyledCollaborations>
      <div className="notifications-container">
        <h1>Collaboration Notifications</h1>

        {notifications?.length === 0 ? (
          <div className="no-content-container">
            <div className="icon">
              <MdOutlineGroupOff />
            </div>
            <div className="text">
              Hi, {userState.user.name}! You haven't got any collaboration
              notifications yet.
            </div>
          </div>
        ) : (
          <div className="notifications">
            {notifications?.map((n) => {
              if (n.type === "PullRequest") {
                return (
                  <div className="notification">
                    <PullRequest pull={n.request} isOverview={true} />
                  </div>
                );
              } else if (n.type === "CollabRequest") {
                return (
                  <div className="notification">
                    <CollabRequest collab={n.request} isOverview={true} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        )}
      </div>
    </StyledCollaborations>
  );
}

export default Collaborations;
