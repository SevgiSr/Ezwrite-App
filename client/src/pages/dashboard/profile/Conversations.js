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
  }, [profileState.conv]);

  return (
    <StyledConversations>
      <div id="parent">
        <Respond dest={username} addComment={addProfileConv} />
        {profileState.conv.map((comment) => {
          return (
            <Conversation
              key={comment._id}
              author={comment.author}
              comment={comment}
            />
          );
        })}
      </div>
    </StyledConversations>
  );
}

export default Conversations;
