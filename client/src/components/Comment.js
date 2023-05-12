import StyledComment from "./styles/Comment.styled";
import ProfilePicture from "./ProfilePicture";
import getDate from "../utils/getDate";

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
            <span className="username">{comment?.author?.name}</span>
            <span className="text">{comment.content}</span>
          </div>

          <div className="info">
            <span className="date">{getDate(comment.createdAt)}</span>
            <span style={{ margin: "0 5px" }}>•</span>
            <span className="reply">Reply</span>
          </div>
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
