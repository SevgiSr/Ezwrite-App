import ProfilePicture from "./ProfilePicture";
import StyledMessage from "./styles/Message.styled";

const Message = ({ content, isSelf }) => {
  return (
    <StyledMessage isSelf={isSelf}>
      <ProfilePicture width={"30px"} height={"30px"} />
      <div className="content">{content}</div>
    </StyledMessage>
  );
};

export default Message;
