import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ProfileContext } from "../../../context/profileContext";
import { Conversation } from "../../../components";
import StyledConversations from "./styles/Conversations.styled";
import Respond from "../../../components/Respond";
import { UserContext } from "../../../context/userContext";

function Conversations() {
  const { username } = useParams();
  const { profileState, addProfileConv, getProfileConv, addConvComment } =
    useContext(ProfileContext);
  const { userState } = useContext(UserContext);
  const location = useLocation();
  useEffect(() => {
    getProfileConv(username);
  }, []);

  return (
    <StyledConversations>
      <div id="parent">
        <Respond
          text={`<strong>${userState.user.name}</strong> posted a message to your feed`}
          activity={`<strong>${userState.user.name}</strong> posted a message to <strong>${profileState.profile.name}</strong>'s feed`}
          type="profile"
          sender={userState.user._id}
          location={profileState.profile._id}
          route={location.pathname}
          to={username}
          dest={username}
          addComment={addProfileConv}
        />
        <div className="column-reverse">
          {profileState?.convs?.map((conv) => {
            return (
              <div key={conv._id} id={conv._id} className="conv">
                <Conversation conv={conv} addConvComment={addConvComment} />
              </div>
            );
          })}
        </div>
      </div>
    </StyledConversations>
  );
}

export default Conversations;
