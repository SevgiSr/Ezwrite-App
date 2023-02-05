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

  // if you called addProfileConv func get conversations again
  //useeffect calls a lot of times, is it bad?
  useEffect(() => {
    getProfileConv(username);
  }, [addProfileConv]);

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
