import { useContext, useEffect, useRef } from "react";
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
  const location = useLocation();

  const convRefs = useRef({});

  useEffect(() => {
    const hashValue = location.hash.substring(1);
    const [prefix, conv_id] = hashValue?.split("-");
    if (prefix === "profile" && conv_id) {
      if (convRefs.current[conv_id]) {
        convRefs.current[conv_id].scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <StyledPosts>
      <div id="parent">
        <Respond
          text={`<strong>${userState.user.name}</strong> posted a message to your feed`}
          activity={`<strong>${userState.user.name}</strong> posted a message to <strong>${profileData.profile.name}</strong>'s feed`}
          sender={userState.user._id}
          to={username}
          dest={username}
          route={location.pathname + "#profile-"}
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
              <div
                key={conv._id}
                ref={(el) => {
                  convRefs.current[conv._id] = el;
                }}
                className="conv"
              >
                <Conversation
                  conv={conv}
                  text={`<strong>${userState.user.name}</strong> responded to <strong>${conv.author.name}</strong>'s comment on <strong>${username}</strong>'s feed`}
                  activity={`<strong>${userState.user.name}</strong> responded to <strong>${conv.author.name}</strong>'s comment on <strong>${username}</strong>'s feed`}
                  dest={username}
                  route={location.pathname + "#profile-"}
                  commentRefs={convRefs}
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
