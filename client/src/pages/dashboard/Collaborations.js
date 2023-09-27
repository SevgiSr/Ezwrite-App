import { useContext } from "react";
import StyledCollaborations from "./styles/Collaborations.styled";
import { MyForkContext } from "../../context/myForkContext";
import { useQuery } from "@tanstack/react-query";

function Collaborations() {
  const { getCollabNotifications } = useContext(MyForkContext);
  const {
    data: notifications = [],
    isLoading,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["collab", "notifications"],
    queryFn: () => getCollabNotifications(),
    refetchOnWindowFocus: false,
  });
  if (isLoading) return null;
  return (
    <StyledCollaborations>
      {notifications.map((n) => {
        return <div key={n._id}>{n.type}</div>;
      })}
    </StyledCollaborations>
  );
}

export default Collaborations;
