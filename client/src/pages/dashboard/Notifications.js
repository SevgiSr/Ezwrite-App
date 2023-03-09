import { useContext, useEffect } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import { ProfileContext } from "../../context/profileContext";
import StyledNotifications from "./styles/Notifications.styled";
import he from "he";
import { FaComment, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import getDate from "../../utils/getDate";

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
              <Link
                key={nt._id}
                to={nt.route}
                style={{ textDecoration: "none" }}
                className="notification"
              >
                <div className="profilePicture">
                  <ProfilePicture
                    filename={nt.sender._id}
                    width="35px"
                    height="35px"
                  />
                </div>
                <div>
                  <header
                    dangerouslySetInnerHTML={{
                      __html: `<div>${he.decode(nt.text)}</div>`,
                    }}
                  ></header>
                  <div className="row">
                    {(nt.type === "conversation" || nt.type === "chapter") && (
                      <div className="icon">
                        <FaComment />
                      </div>
                    )}
                    {nt.type === "profile" && (
                      <div className="icon">
                        <FaEnvelope />
                      </div>
                    )}
                    <div className="date">{getDate(nt.createdAt)}</div>
                  </div>
                  <div className="content">{nt.content}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </StyledNotifications>
  );
}

export default Notifications;
