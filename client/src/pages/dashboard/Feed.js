import { useQuery } from "@tanstack/react-query";
import StyledFeed from "./styles/Feed.styled";
import { useContext } from "react";
import { ProfileContext } from "../../context/profileContext";
import { LoadingScreen, Notification, UserLineMini } from "../../components";
import { FaUserClock } from "react-icons/fa";
import ProfilePicture from "../../components/ProfilePicture";
import getDate from "../../utils/getDate";
import styled from "styled-components";

function Feed() {
  const { getFeed } = useContext(ProfileContext);

  const { data: posts = [], isLoading } = useQuery(["feed"], () => getFeed());

  if (isLoading) {
    return <LoadingScreen />;
  }
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
              return <Post key={post._id} conv={post.item} />;
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

function Post({ conv }) {
  return (
    <StyledPost>
      <header>
        <div id="info">
          <UserLineMini user={conv.author} />
          <p>{getDate(conv.createdAt)}</p>
        </div>
      </header>
      <div id="content">{conv.content}</div>
    </StyledPost>
  );
}

const StyledPost = styled.div`
  color: var(--font1);
  background-color: var(--background5);
  padding: 20px 20px;
  margin-top: 1.7rem;
  width: 100%;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;

    #info {
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        font-size: 13px;
        line-height: 18px;
        margin-left: 18px;
        color: var(--font2);
      }
    }
  }
`;

export default Feed;
