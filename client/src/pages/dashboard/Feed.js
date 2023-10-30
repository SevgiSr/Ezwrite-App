import { useQuery } from "@tanstack/react-query";
import StyledFeed from "./styles/Feed.styled";
import { useContext } from "react";
import { ProfileContext } from "../../context/profileContext";
import { Conversation, Notification } from "../../components";
import { FaUserClock } from "react-icons/fa";
import { UserContext } from "../../context/userContext";

function Feed() {
  const {
    getFeed,
    useDeleteProfileConv,
    useAddConvComment,
    useDeleteConvComment,
  } = useContext(ProfileContext);

  const { userState } = useContext(UserContext);

  const { data: posts = [], isLoading } = useQuery(["feed"], () => getFeed());

  if (isLoading) return null;
  return (
    <StyledFeed>
      <div className="header">
        <h1>Feed</h1>
      </div>
      {posts?.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <FaUserClock />
          </div>
          <div className="text">
            Follow some people to see their feed in here.
          </div>
        </div>
      ) : (
        <div className="posts">
          {posts.map((post) => {
            if (post.type === "Comment") {
              return (
                <Conversation
                  key={post._id}
                  text={`<strong>${userState.user.name}</strong> responded to <strong>${post.item.author.name}</strong>`}
                  activity={`<strong>${userState.user.name}</strong> responded to <strong>${post.item.author.name}</strong>`}
                  conv={post.item}
                  dest={post.item.author?.name}
                  sendTo={post.item.author.name}
                  useAddConvComment={useAddConvComment}
                  useDeleteConv={useDeleteProfileConv}
                  useDeleteConvComment={useDeleteConvComment}
                />
              );
            } else {
              return (
                <Notification key={post._id} nt={post.item} isActivity={true} />
              );
            }
          })}
        </div>
      )}
    </StyledFeed>
  );
}

export default Feed;
