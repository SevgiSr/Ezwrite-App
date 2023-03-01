import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/profileContext";
import { UserContext } from "../../context/userContext";
import StyledInbox from "./styles/Inbox.styled";
import ProfilePicture from "../../components/ProfilePicture";
import { Link } from "react-router-dom";

function Inbox() {
  const { getInbox, profileState } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    getInbox();
  }, []);
  return (
    <StyledInbox>
      {profileState.inbox.map((privateConv) => {
        const partner = privateConv.users.filter(
          (u) => userState.user._id !== u._id
        )[0];

        const last_msg = privateConv.messages[privateConv.messages.length - 1];

        const date = new Date(last_msg.createdAt);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });
        return (
          <Link className="privateConv" to={`/inbox/${partner.name}`}>
            <div className="main">
              <ProfilePicture
                filename={partner._id}
                width="40px"
                height="40px"
              />
              <div className="content">
                <span className="username">{partner.name}</span>
                <span className="first-msg">{last_msg.content}</span>
              </div>
            </div>
            <div className="time">{formattedDate}</div>
          </Link>
        );
      })}
    </StyledInbox>
  );
}

export default Inbox;
