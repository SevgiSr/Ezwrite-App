import ProfilePicture from "./ProfilePicture";
import StyledConversation from "./styles/Conversation.styled";
import Respond from "./Respond";
import { useContext, useRef } from "react";
import Comment from "./Comment";
import { UserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import getDate from "../utils/getDate";
import { DropdownMenu } from "./index";
import { RiMoreFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { BsFlagFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

const Conversation = ({
  conv,
  text,
  activity,
  dest, //username
  story_id = null,
  route,
  commentRefs,
  sendTo,
  useAddConvComment,
  useDeleteConv,
  useDeleteConvComment,
}) => {
  const { userState } = useContext(UserContext);
  const deleteConvMutation = useDeleteConv();

  /*
  I want convs to refetch when I add a comment under conv. 
  but I don't use a queryKey here and I send a different dest value.
  that's why addComment function in Respond will be invalidating all queries starting with "conversations"
  meaning the whole convs array will be refetched even when I'm using Respond from here.

  */

  const handleDeleteClick = () => {
    if (story_id) {
      deleteConvMutation.mutate({ story_id, dest, conv_id: conv._id });
    } else {
      deleteConvMutation.mutate({ dest, conv_id: conv._id });
    }
  };

  if (!conv) return null;

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
            <div style={{ marginLeft: "10px" }}>
              <h3>{conv.author.name}</h3>
              <p>{getDate(conv.createdAt)}</p>
            </div>
          </div>
          <div className="options">
            {deleteConvMutation.isLoading ? (
              <ClipLoader color="rgb(0, 178, 178)" size={18} />
            ) : (
              <DropdownMenu
                button={
                  <div className="icon">
                    <RiMoreFill />
                  </div>
                }
                menu={
                  <>
                    <button
                      onClick={handleDeleteClick}
                      className="dropdown-item"
                    >
                      <div className="icon">
                        <FaTrash />
                      </div>
                      Delete Comment
                    </button>
                    <button className="dropdown-item">
                      <div className="icon">
                        <BsFlagFill />
                      </div>
                      Report Comment
                    </button>
                  </>
                }
              />
            )}
          </div>
        </header>
        <div id="content">{conv.content}</div>
        {conv.subcomments?.map((sc) => {
          return (
            <div
              key={sc._id}
              className="subcomment"
              ref={(el) => {
                commentRefs.current[sc._id] = el;
              }}
            >
              <Comment
                id={sc._id}
                comment={sc}
                story_id={story_id} // if conv has story_id means it should affect story's score
                conv_id={conv._id}
                useDeleteConvComment={useDeleteConvComment}
              />
            </div>
          );
        })}
      </StyledConversation>

      <Respond
        text={text}
        activity={activity}
        sender={userState.user._id}
        story_id={story_id}
        to={sendTo}
        dest={conv._id}
        route={route}
        useAddConv={useAddConvComment}
        isFeed={false}
      />
    </>
  );
};

export default Conversation;
