import src from "../assets/pp.png";
import ProfilePicture from "./ProfilePicture";
import StyledConversation from "./styles/Conversation.styled";
import Respond from "./Respond";
import { ProfileContext } from "../context/profileContext";
import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";

const Conversation = ({ conv, addConvComment }) => {
  const user = localStorage.getItem("user");

  if (!conv) return null;
  if (!conv.content) return null;
  return (
    <>
      <StyledConversation>
        <header>
          <div id="info">
            <ProfilePicture
              filename={conv.author._id}
              width="42px"
              height="42px"
            />
            <div>
              <h3>{conv.author.name}</h3>
              <p>time</p>
            </div>
          </div>
          <div id="options">...</div>
        </header>
        <main id="content">{conv.content}</main>
        {conv.subcomments?.map((sc) => {
          return <Comment key={sc._id} comment={sc} />;
        })}
      </StyledConversation>

      <Respond
        text={`<strong>${
          user.name
        }</strong> responded to your comment in <strong>${conv.content.slice(
          0,
          20
        )}...</strong>`}
        type="conversation"
        sender={user._id}
        location={conv._id}
        to={conv.author.name}
        dest={conv._id}
        addComment={addConvComment}
      />
    </>
  );
};

export default Conversation;
