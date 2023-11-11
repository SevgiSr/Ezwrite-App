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
import { LoadingScreen, Notification } from "../../components";

function Notifications() {
  const { getNotifications } = useContext(ProfileContext);

  const { data: notifications = [], isLoading } = useQuery(
    ["notifications"],
    ({ signal }) => getNotifications(signal),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <StyledNotifications>
      <div className="header">
        <h1>Notifications</h1>
      </div>
      {!isLoading && notifications.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <IoIosNotificationsOutline />
          </div>
          <div className="text">
            You haven't received any notifications yet.
          </div>
        </div>
      ) : (
        <div className="notifications-container">
          {isLoading ? (
            <NotificationsFallback />
          ) : (
            <>
              {notifications?.map((nt) => {
                return <Notification key={nt._id} nt={nt} />;
              })}
            </>
          )}
        </div>
      )}
    </StyledNotifications>
  );
}

function NotificationsFallback() {
  return (
    <div className="fallback">
      <ClipLoader color="var(--accent)" size={50} />
    </div>
  );
}

export default Notifications;
