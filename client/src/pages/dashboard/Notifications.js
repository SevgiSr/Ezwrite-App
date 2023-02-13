import { useContext, useEffect } from "react";
import { ProfileContext } from "../../context/profileContext";
import StyledNotifications from "./styles/Notifications.styled";

function Notifications() {
  const { profileState, openNotifications } = useContext(ProfileContext);
  useEffect(() => {
    openNotifications();
  }, []);

  return (
    <StyledNotifications>
      {profileState?.notifications?.map((nt) => {
        return (
          <div key={nt._id} className="notification">
            <div>{nt.sender.name}</div>
            <div> {nt.type}</div>
            <div>{nt.content}</div>
          </div>
        );
      })}
    </StyledNotifications>
  );
}

export default Notifications;
