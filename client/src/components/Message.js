import ProfilePicture from "./ProfilePicture";
import StyledMessage from "./styles/Message.styled";

const Message = ({ msg, isSelf }) => {
  return (
    <StyledMessage isSelf={isSelf}>
      <ProfilePicture
        filename={msg.author._id}
        width={"30px"}
        height={"30px"}
      />
      <div className="content">{msg.content}</div>
    </StyledMessage>
  );
};

export default Message;
