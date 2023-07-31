import { useContext, useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { ProfileContext } from "../../../context/profileContext";
import { Conversation } from "../../../components";
import StyledConversations from "./styles/Conversations.styled";
import Respond from "../../../components/Respond";
import { UserContext } from "../../../context/userContext";
import { useQuery } from "@tanstack/react-query";

function Conversations() {
  const { username } = useParams();
  const {
    profileState,
    useAddProfileConv,
    useDeleteProfileConv,
    useAddConvComment,
    useDeleteConvComment,
  } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);
  const location = useLocation();
  const { convs } = useOutletContext();

  /*
  -loads at first time you click on conversations
  -second time you switch away and get back to it it doesn't load (like caching)
  -when someone else posts conv it doesn't update until you refresh

  useEffect(() => {
    getProfileConv(username);
  }, []); 
  */

  return (
    <StyledConversations>
      <div id="parent">
        <Respond
          text={`<strong>${userState.user.name}</strong> posted a message to your feed`}
          activity={`<strong>${userState.user.name}</strong> posted a message to <strong>${profileState.profile.name}</strong>'s feed`}
          sender={userState.user._id}
          route={location.pathname}
          to={username}
          dest={username}
          useAddConv={useAddProfileConv}
        />
        <div className="column-reverse">
          {convs?.map((conv) => {
            return (
              <div key={conv._id} id={conv._id} className="conv">
                <Conversation
                  conv={conv}
                  dest={username}
                  useAddConvComment={useAddConvComment}
                  useDeleteConv={useDeleteProfileConv}
                  useDeleteConvComment={useDeleteConvComment}
                />
              </div>
            );
          })}
        </div>
      </div>
    </StyledConversations>
  );
}

export default Conversations;
