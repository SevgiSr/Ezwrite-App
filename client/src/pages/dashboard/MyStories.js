import { useEffect, useState, Suspense } from "react";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import { MyStory } from "../../components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import StyledMyStories from "./styles/MyStories.styled";
import { ImBooks } from "react-icons/im";
import { UserContext } from "../../context/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FallingLines } from "react-loader-spinner";

function MyStories({ show }) {
  const navigate = useNavigate();
  const { storyState, getMyStories, deleteStory } = useContext(MyStoryContext);
  const { userState } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //staleTime is infitiy so that is stays fresh until mutation
  //because this data will not be updated unless user updated it himself
  //now it does not have to make backend request each time this component is rendered
  //and it will not make slow backend requests when user navigates between stories
  const { data: myStories = [], isLoading } = useQuery(
    ["myStories"],
    getMyStories,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  return (
    <StyledMyStories>
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
        {!isLoading && myStories.length === 0 ? (
          <div className="no-stories">
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
        ) : (
          <div className="stories-container">
            {isLoading ? (
              <StoriesFallback />
            ) : (
              <>
                {myStories.map((story) => {
                  return (
                    <div key={story._id} className="my-story">
                      <MyStory
                        key={story._id}
                        story={story}
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </StyledMyStories>
  );
}

function StoriesFallback() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <FallingLines
        color="#ff6122"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
}

export default MyStories;
