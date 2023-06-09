import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/profileContext";
import { UserContext } from "../../context/userContext";
import StyledInbox from "./styles/Inbox.styled";
import ProfilePicture from "../../components/ProfilePicture";
import { Link } from "react-router-dom";
import getDate from "../../utils/getDate";
import { BsEnvelopeOpen } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";

function Inbox() {
  const { getInbox, profileState } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);

  useEffect(() => {
    getInbox();
  }, []);

  return (
    <StyledInbox>
      {profileState.inbox.length === 0 ? (
        <div className="no-messages">
          <div className="icon">
            <BsEnvelopeOpen />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't had any messages yet!
          </div>
        </div>
      ) : (
        <div className="inbox">
          {profileState.inbox.map((privateConv) => {
            const partner = privateConv.users.filter(
              (u) => userState.user._id !== u._id
            )[0];

            const last_msg =
              privateConv.messages[privateConv.messages.length - 1];

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
                <div className="time">{getDate(last_msg.createdAt)}</div>
              </Link>
            );
          })}
        </div>
      )}
    </StyledInbox>
  );
}

export default Inbox;
