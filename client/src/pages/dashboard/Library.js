import { useQuery } from "@tanstack/react-query";
import StyledLibrary from "./styles/Library.styled";
import { useContext, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { UserContext } from "../../context/userContext";
import OrangeLinks from "../../components/OrangeLinks";
import { ReadingLists } from "../../components";
import { Link } from "react-router-dom";
import Cover from "../../components/Cover";
import { GoEye } from "react-icons/go";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";

function Library() {
  const { userState } = useContext(UserContext);
  const { getLibrary } = useContext(StoryContext);

  const [navbar, setNavbar] = useState("continue");

  const { data: { continueReading, readingLists } = {}, isLoading } = useQuery(
    ["library"],
    getLibrary,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <StyledLibrary>
      <header>
        <OrangeLinks
          links={[
            {
              to: "",
              label: "Continue Reading",
              handleClick: () => setNavbar("continue"),
            },
            {
              to: "",
              label: "Reading List",
              handleClick: () => setNavbar("list"),
            },
          ]}
        />
      </header>
      {navbar === "continue" && <Continue continueReading={continueReading} />}
      {navbar === "list" && <ReadingLists readingLists={readingLists} />}
    </StyledLibrary>
  );
}

function Continue({ continueReading }) {
  return (
    <div className="continueReading">
      {continueReading?.map((progress) => {
        console.log(progress);
        return (
          <div key={progress._id} className="item">
            <Story story={progress.story} />
            <div className="progress">
              <div
                style={{
                  width: `${
                    5 +
                    (progress.chapterIndex / progress.story?.chapters?.length) *
                      100
                  }%`,
                  height: "5px",
                  backgroundColor: "#00b2b2",
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Story({ story }) {
  if (!story) return null;
  return (
    <div className="story">
      <Link to={`/story/${story._id}`} style={{ textDecoration: "none" }}>
        <Cover filename={story._id} width={"123px"} />
        <div className="title">{story.title}</div>
        <div className="meta-data">
          <div>
            <div className="icon">
              <GoEye />
            </div>
            <div className="count">0</div>
          </div>
          <div>
            <div className="icon">
              <BsFillStarFill />
            </div>
            <div className="count">106</div>
          </div>
          <div>
            <div className="icon">
              <AiOutlineBars />
            </div>
            <div className="count">9</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Library;
