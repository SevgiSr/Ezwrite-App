import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../../../context/profileContext";
import { Conversation } from "../../../components";
import StyledConversations from "./styles/Conversations.styled";
import Respond from "../../../components/Respond";

function Conversations() {
  const { username } = useParams();
  const { profileState, addProfileConv, getProfileConv } =
    useContext(ProfileContext);

  useEffect(() => {
    getProfileConv(username);
  }, []);

  return (
    <StyledConversations>
      <div id="parent">
        <Respond
          type="someone commented on your profile"
          to={username}
          dest={username}
          addComment={addProfileConv}
        />
        {profileState?.convs?.map((conv) => {
          return <Conversation key={conv._id} conv={conv} />;
        })}
      </div>
    </StyledConversations>
  );
}

export default Conversations;
