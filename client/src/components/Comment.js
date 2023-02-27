import StyledComment from "./styles/Comment.styled";
import ProfilePicture from "./ProfilePicture";

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
        <div className="content">
          <span>{comment?.author?.name}</span>
          {comment.content}
        </div>
      </StyledComment>
    </>
  );
};

export default Comment;
