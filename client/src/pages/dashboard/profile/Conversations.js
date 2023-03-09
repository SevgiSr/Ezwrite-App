import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../../context/profileContext";
import { Conversation } from "../../../components";
import StyledConversations from "./styles/Conversations.styled";
import Respond from "../../../components/Respond";

function Conversations() {
  const { username } = useParams();
  const { profileState, addProfileConv, getProfileConv, addConvComment } =
    useContext(ProfileContext);
  const user = localStorage.getItem("user");
  useEffect(() => {
    getProfileConv(username);
  }, []);

  return (
    <StyledConversations>
      <div id="parent">
        <Respond
          text={`<strong>${user.name}</strong> posted a message to your feed`}
          type="profile"
          sender={user._id}
          location={profileState.profile._id}
          to={username}
          dest={username}
          addComment={addProfileConv}
        />
        <div className="column-reverse">
          {profileState?.convs?.map((conv) => {
            return (
              <div key={conv._id} className="conv">
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
