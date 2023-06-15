import src from "../assets/pp.png";
import ProfilePicture from "./ProfilePicture";
import StyledConversation from "./styles/Conversation.styled";
import Respond from "./Respond";
import { ProfileContext } from "../context/profileContext";
import { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import { UserContext } from "../context/userContext";
import { useLocation, useParams } from "react-router-dom";
import getDate from "../utils/getDate";
import { useQuery } from "@tanstack/react-query";
import { FiMoreHorizontal } from "react-icons/fi";
import { DropdownMenu } from "./index";
import { RiMoreFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { BsFlagFill } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

const Conversation = ({
  conv,
  dest,
  useAddConvComment,
  useDeleteConv,
  useDeleteConvComment,
}) => {
  const { userState } = useContext(UserContext);
  const deleteConvMutation = useDeleteConv();
  const location = useLocation();

  /*
  I want convs to refetch when I add a comment under conv. 
  but I don't use a queryKey here and I send a different dest value.
  that's why addComment function in Respond will be invalidating all queries starting with "conversations"
  meaning the whole convs array will be refetched even when I'm using Respond from here.

  */

  const handleDeleteClick = () => {
    deleteConvMutation.mutate({ dest, conv_id: conv._id });
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
            <Comment
              key={sc._id}
              comment={sc}
              conv_id={conv._id}
              useDeleteConvComment={useDeleteConvComment}
            />
          );
        })}
      </StyledConversation>

      <Respond
        text={`<strong>${
          userState.user.name
        }</strong> responded to your comment in <strong>${conv.content.slice(
          0,
          20
        )}...</strong>`}
        activity={`<strong>${
          userState.user.name
        }</strong> responded to <strong>${
          conv.author.name
        }</strong>'s comment in <strong>${conv.content.slice(
          0,
          20
        )}...</strong>`}
        type="conversation"
        sender={userState.user._id}
        location={conv._id}
        route={location.pathname}
        to={conv.author.name}
        dest={conv._id}
        useAddConv={useAddConvComment}
      />
    </>
  );
};

export default Conversation;
