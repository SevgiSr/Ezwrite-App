import src from "../assets/pp.png";
import ProfilePicture from "./ProfilePicture";
import StyledConversation from "./styles/Conversation.styled";
import Respond from "./Respond";
import { ProfileContext } from "../context/profileContext";
import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";

const Conversation = ({ conv, addConvComment }) => {
  const user = localStorage.getItem("user");

  return (
    <>
      <StyledConversation>
        <header>
          <div id="info">
            <ProfilePicture width="42px" height="42px" />
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
        type={` responded to your comment in "${conv.content.substr(
          0,
          10
        )}..."`}
        to={conv.author.name}
        dest={conv._id}
        addComment={addConvComment}
      />
    </>
  );
};

export default Conversation;
