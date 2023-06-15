import StyledComment from "./styles/Comment.styled";
import ProfilePicture from "./ProfilePicture";
import getDate from "../utils/getDate";
import DropdownMenu from "./DropdownMenu";
import { FiMoreHorizontal } from "react-icons/fi";

const Comment = ({ comment, conv_id, useDeleteConvComment }) => {
  const deleteConvCommentMutation = useDeleteConvComment();

  const handleDeleteClick = () => {
    console.log("deleting...");
    deleteConvCommentMutation.mutate({
      conv_id: conv_id,
      comment_id: comment._id,
    });
  };

  return (
    <>
      <StyledComment>
        <ProfilePicture
          filename={comment?.author?._id}
          id="avatar"
          width="30px"
          height="30px"
        />
        <div className="main">
          <div className="content">
            <span className="username">{comment?.author?.name}</span>
            <span className="text">{comment.content}</span>
          </div>

          <div className="info">
            <span className="date">{getDate(comment.createdAt)}</span>
            <span style={{ margin: "0 5px" }}>•</span>
            <span className="reply">Reply</span>
          </div>
        </div>
        <div className="options">
          <DropdownMenu
            buttonClass="icon"
            button={<FiMoreHorizontal />}
            menu={
              <>
                <div onClick={handleDeleteClick}>Delete Comment</div>
                <div>Report Comment</div>
              </>
            }
          />
        </div>
      </StyledComment>
    </>
  );
};

/* 
const Comment = ({ comment }) => {
  return (
    <>
      <StyledComment>
        <ProfilePicture
          filename={comment?.author?._id}
          id="avatar"
          width="30px"
          height="30px"
        />
        <div className="main">
          <div className="content">
            <div className="username">{comment?.author?.name}</div>
            <div className="text">{comment.content}</div>
          </div>

          <div className="info">
            <span className="date">{getDate(comment.createdAt)}</span>
            <span>.</span>
            <span className="reply">Reply</span>
          </div>
        </div>
      </StyledComment>
    </>
  );
};



*/

export default Comment;
