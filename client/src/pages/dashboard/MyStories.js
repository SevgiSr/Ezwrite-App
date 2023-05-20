import { useEffect, useState } from "react";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import { MyStory } from "../../components";
import { Navigate, useNavigate } from "react-router-dom";
import StyledMyStories from "./styles/MyStories.styled";
import Story from "../../components/Story";
import OrangeLinks from "../../components/OrangeLinks";
import { AiOutlineClose } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import { UserContext } from "../../context/userContext";
import { useQuery } from "@tanstack/react-query";

function MyStories({ show }) {
  const navigate = useNavigate();
  const { storyState, getMyStories } = useContext(MyStoryContext);
  const { userState } = useContext(UserContext);

  const { data: myStories = [], isLoading } = useQuery(
    ["myStories"],
    getMyStories,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <StyledMyStories>
      {myStories.length === 0 ? (
        <div className="container">
          <h2>My Stories</h2>
          <div className="card no-stories">
            <div className="icon">
              <ImBooks />
            </div>
            <div className="text">
              Hi, {userState.user.name}! You haven't written any stories yet.
            </div>
            <button
              className="orange-button btn"
              onClick={() => navigate("/newStory")}
            >
              + Create story
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <header>
            <h2>My Stories</h2>
            <button
              className="orange-button btn"
              onClick={() => navigate("/newStory")}
            >
              + Create story
            </button>
          </header>

          <div className="stories-container">
            <OrangeLinks links={[{ to: "", label: "Tüm Hikayelerim" }]} />
            {myStories.map((story) => {
              return <MyStory key={story._id} story={story} show={show} />;
            })}
          </div>
        </div>
      )}
    </StyledMyStories>
  );
}

export default MyStories;
