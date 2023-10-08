import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import {
  MyStory,
  Story,
  StoryCardMini,
  UserLine,
  UserLineMini,
} from "../../components";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import StyledMyStories from "./styles/MyStories.styled";
import { ImBooks } from "react-icons/im";
import { UserContext } from "../../context/userContext";
import { useQuery } from "@tanstack/react-query";
import { Dna, FallingLines } from "react-loader-spinner";
import NavLinks from "../../components/NavLinks";
import { MdOutlineGroupOff } from "react-icons/md";
import { BiGitPullRequest } from "react-icons/bi";
import { VscRepoForked } from "react-icons/vsc";

function MyStories({ show }) {
  const navigate = useNavigate();
  const { mutationState } = useContext(MyStoryContext);
  const location = useLocation();
  const tab = location.pathname.split("/")[3];

  //staleTime is infitiy so that is stays fresh until mutation
  //because this data will not be updated unless user updated it himself
  //now it does not have to make backend request each time this component is rendered
  //and it will not make slow backend requests when user navigates between stories

  return (
    <StyledMyStories>
      <nav>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavLinks
            links={[
              {
                label: "My Stories",
                to: "/workspace/myStories/",
                active: location.pathname === "/workspace/myStories/",
              },
            ]}
          />
          {mutationState.isLoading && (
            <div className="header-loader">
              <Dna
                visible={true}
                height="50"
                width="50"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
              <span>Loading...</span>
            </div>
          )}
        </div>
        <button className="btn btn-main" onClick={() => navigate("/newStory")}>
          + Create story
        </button>
      </nav>
      <Outlet />
    </StyledMyStories>
  );
}

function Stories() {
  const { userState } = useContext(UserContext);
  const { getMyStories } = useContext(MyStoryContext);
  const navigate = useNavigate();
  const { data: myStories = [], isLoading } = useQuery(
    ["myStories"],
    getMyStories,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (isLoading) return null;
  return (
    <div>
      {!isLoading && myStories.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <ImBooks />
          </div>
          <div className="text">
            Hi, {userState.user.name}! You haven't written any stories yet.
          </div>
          <button
            className="btn btn-main"
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
                    <MyStory key={story._id} story={story} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function StoriesFallback() {
  return (
    <div style={{ margin: "5rem 0" }}>
      <FallingLines
        color="#ff6122"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
}

export { MyStories, Stories };
