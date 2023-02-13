import src from "../assets/pp.png";
import ProfilePicture from "./ProfilePicture";
import StyledConversation from "./styles/Conversation.styled";
import Respond from "./Respond";
import { ProfileContext } from "../context/profileContext";
import { useContext, useEffect } from "react";
import Comment from "./Comment";

const Conversation = ({ author, comment }) => {
  const { addConvComment } = useContext(ProfileContext);

  return (
    <>
      <StyledConversation>
        <header>
          <div id="info">
            <ProfilePicture width="42px" height="42px" />
            <div>
              <h3>sevgi</h3>
              <p>time</p>
            </div>
          </div>
          <div id="options">...</div>
        </header>
        <main id="content">{comment.content}</main>
        {comment.subcomments.map((sc) => {
          return <Comment key={sc._id} comment={sc} />;
        })}
      </StyledConversation>

      <Respond
        type="your comment got response"
        to={author}
        dest={comment._id}
        addComment={addConvComment}
      />
    </>
  );
};

export default Conversation;
