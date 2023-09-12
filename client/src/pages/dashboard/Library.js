import { useQuery } from "@tanstack/react-query";
import StyledLibrary from "./styles/Library.styled";
import { useContext, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { UserContext } from "../../context/userContext";
import OrangeLinks from "../../components/OrangeLinks";
import { ReadingLists, StoryCardMini } from "../../components";
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
      <Continue continueReading={continueReading} />
      <h2>Reading Lists</h2>
      <ReadingLists readingLists={readingLists} />
    </StyledLibrary>
  );
}

function Continue({ continueReading }) {
  return (
    <div className="continueReading">
      <h2>Continue Reading</h2>
      <div className="continue-stories">
        {continueReading?.map((progress) => {
          console.log(progress);
          return (
            <div key={progress._id} className="item">
              <StoryCardMini story={progress.story} />
              <div className="progress">
                <div
                  style={{
                    width: `${
                      5 +
                      (progress.chapterIndex /
                        progress.story?.chapters?.length) *
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
    </div>
  );
}

export default Library;
