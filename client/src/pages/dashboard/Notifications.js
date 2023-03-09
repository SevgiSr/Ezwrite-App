import { useContext, useEffect } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import { ProfileContext } from "../../context/profileContext";
import StyledNotifications from "./styles/Notifications.styled";
import he from "he";

function Notifications() {
  const { profileState, openNotifications, deleteNotifications } =
    useContext(ProfileContext);
  useEffect(() => {
    openNotifications();
  }, []);
  const htmlString = "<h1>Hello World!</h1><p>This is a paragraph.</p>";

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
                <ProfilePicture
                  filename={nt.sender._id}
                  width="30px"
                  height="30px"
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<div>${he.decode(nt.text)}</div>`,
                  }}
                  className="nt-header"
                ></div>
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
