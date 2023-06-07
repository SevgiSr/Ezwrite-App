import { useQuery } from "@tanstack/react-query";
import StyledLibrary from "./styles/Library.styled";
import { useContext, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { UserContext } from "../../context/userContext";
import OrangeLinks from "../../components/OrangeLinks";
import { ReadingLists, StoryDetailed } from "../../components";

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
        return (
          <div key={progress._id} className="story">
            <StoryDetailed story={progress.story} />
          </div>
        );
      })}
    </div>
  );
}

export default Library;
