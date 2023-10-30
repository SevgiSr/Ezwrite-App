import { useContext } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { ProfileContext } from "../../../context/profileContext";
import { Conversation } from "../../../components";
import Respond from "../../../components/Respond";
import { UserContext } from "../../../context/userContext";
import StyledPosts from "./styles/Posts.styled";

function Posts() {
  const { username } = useParams();
  const {
    useAddProfileConv,
    useDeleteProfileConv,
    useAddConvComment,
    useDeleteConvComment,
  } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);
  const mainUser = userState.user.name;
  const { convs, profileData } = useOutletContext();

  /*
  -loads at first time you click on conversations
  -second time you switch away and get back to it it doesn't load (like caching)
  -when someone else posts conv it doesn't update until you refresh

  useEffect(() => {
    getProfileConv(username);
  }, []); 
  */

  console.log(profileData);

  return (
    <StyledPosts>
      <div id="parent">
        <Respond
          text={`<strong>${userState.user.name}</strong> posted a message to your feed`}
          activity={`<strong>${userState.user.name}</strong> posted a message to <strong>${profileData.profile.name}</strong>'s feed`}
          sender={userState.user._id}
          to={username}
          dest={username}
          useAddConv={useAddProfileConv}
          type={profileData.isMainUser ? "Post" : "Notification"} // if it's main user posting comment on profile, it is a post
        />
        <div className="column-reverse">
          {convs?.map((conv) => {
            const commentAuthor = conv.author.name;

            //if ure commentator, notify author, if ure author notify commentator if ure both notify nobody
            const toArray = [];
            if (mainUser !== commentAuthor) {
              toArray.push(commentAuthor);
            }

            if (mainUser !== username) {
              toArray.push(username);
            }
            return (
              <div key={conv._id} id={conv._id} className="conv">
                <Conversation
                  conv={conv}
                  text={`<strong>${userState.user.name}</strong> responded to <strong>${conv.author.name}</strong>'s comment on <strong>${username}</strong>'s feed`}
                  activity={`<strong>${userState.user.name}</strong> responded to <strong>${conv.author.name}</strong>'s comment on <strong>${username}</strong>'s feed`}
                  dest={username}
                  sendTo={toArray.length === 0 ? null : toArray}
                  useAddConvComment={useAddConvComment}
                  useDeleteConv={useDeleteProfileConv}
                  useDeleteConvComment={useDeleteConvComment}
                />
              </div>
            );
          })}
        </div>
      </div>
    </StyledPosts>
  );
}

export default Posts;
