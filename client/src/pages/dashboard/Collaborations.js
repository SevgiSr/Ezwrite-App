import { useContext, useEffect } from "react";
import StyledCollaborations from "./styles/Collaborations.styled";
import { MyForkContext } from "../../context/myForkContext";
import { useQuery } from "@tanstack/react-query";
import { CollabRequest, PullRequest } from "../../components";
import { MdOutlineGroupOff } from "react-icons/md";
import { UserContext } from "../../context/userContext";

function Collaborations() {
  const { getCollabNotifications, useReadCollabNotifications } =
    useContext(MyForkContext);
  const { userState } = useContext(UserContext);
  const { data: notifications = [], isLoading } = useQuery(
    ["notifications", "collab"],
    getCollabNotifications
  );

  const readCollabNotificationsMutation = useReadCollabNotifications();

  //THIS ACTION MAKES COLLAB NOTIFICATIONS FETCH FOREVER
  /*  useEffect(() => {
    return async () => {
      console.log("unmount");
      await readCollabNotificationsMutation.mutate();
    };
  }, []); */

  //messes things up too
  /*   useEffect(() => {
    const timer = setTimeout(() => {
      console.log("marked read");
      readCollabNotificationsMutation.mutate();
    }, 5000);

    return () => clearTimeout(timer);
  }, []); */

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
                  <div className={"notification " + (!n.isRead && "unread")}>
                    <PullRequest pull={n.request} isOverview={true} />
                  </div>
                );
              } else if (n.type === "CollabRequest") {
                return (
                  <div className={"notification " + (!n.isRead && "unread")}>
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
