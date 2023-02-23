import { useContext, useEffect } from "react";
import { ProfileContext } from "../../context/profileContext";
import StyledNotifications from "./styles/Notifications.styled";

function Notifications() {
  const { profileState, openNotifications, deleteNotifications } =
    useContext(ProfileContext);
  useEffect(() => {
    openNotifications();
  }, []);

  return (
    <StyledNotifications>
      <div className="nt-parent">
        <div className="header">
          <h1>Notifications</h1>
          <button onClick={deleteNotifications} className="btn">
            Delete All Notifications
          </button>
        </div>
        <div className="column-reverse">
          {profileState?.notifications?.map((nt) => {
            return (
              <div key={nt._id} className="notification">
                <div className="nt-header">
                  <span style={{ fontWeight: "900" }}>{nt.sender.name}</span>
                  <span>{nt.type}</span>
                </div>
                <div className="nt-content">{nt.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </StyledNotifications>
  );
}

export default Notifications;
