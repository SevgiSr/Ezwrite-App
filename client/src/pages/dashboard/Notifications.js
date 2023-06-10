import { useContext, useEffect } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import { ProfileContext } from "../../context/profileContext";
import StyledNotifications from "./styles/Notifications.styled";
import he from "he";
import { FaComment, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import getDate from "../../utils/getDate";
import { UserContext } from "../../context/userContext";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { IoIosNotificationsOutline } from "react-icons/io";

function Notifications() {
  const { getProfile } = useContext(ProfileContext);

  const { userState } = useContext(UserContext);

  const { data: profileData = {}, isLoading } = useQuery(
    ["profile", userState.user.name],
    () => getProfile(userState.user.name),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <StyledNotifications>
      <div className="nt-parent">
        <div className="header">
          <h1>Notifications</h1>
        </div>
        {!isLoading && profileData.profile.notifications.length === 0 ? (
          <h3 className="no-notifications">
            <div className="icon">
              <IoIosNotificationsOutline />
            </div>
            <div className="text">
              You haven't received any notifications yet.
            </div>
          </h3>
        ) : (
          <div className="notifications-container">
            {isLoading ? (
              <NotificationsFallback />
            ) : (
              <>
                {profileData.profile.notifications.map((nt) => {
                  console.log(nt);
                  return (
                    <Link
                      key={nt._id}
                      to={nt.route}
                      style={{ textDecoration: "none" }}
                      className="notification"
                    >
                      <div className="profilePicture">
                        <ProfilePicture
                          filename={nt.sender?._id}
                          width="35px"
                          height="35px"
                        />
                      </div>
                      <div>
                        <header
                          dangerouslySetInnerHTML={{
                            __html: `<div>${
                              nt.text ? he.decode(nt.text) : ""
                            }</div>`,
                          }}
                        ></header>
                        <div className="row">
                          {(nt.type === "conversation" ||
                            nt.type === "chapter") && (
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
              </>
            )}
          </div>
        )}
      </div>
    </StyledNotifications>
  );
}

function NotificationsFallback() {
  return (
    <div className="fallback">
      <ClipLoader color="#ff6122" size={50} />
    </div>
  );
}

export default Notifications;
