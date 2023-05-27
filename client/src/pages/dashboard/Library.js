import { useQuery } from "@tanstack/react-query";
import StyledLibrary from "./styles/Library.styled";
import { useContext, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { UserContext } from "../../context/userContext";
import OrangeLinks from "../../components/OrangeLinks";

function Library() {
  const { userState } = useContext(UserContext);
  const { getLibrary } = useContext(StoryContext);

  const [navbar, setNavbar] = useState("continue");

  const { data: library = {}, isLoading } = useQuery(
    ["library", userState.user._id],
    getLibrary,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
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
      {navbar === "continue" && <Continue />}
      {navbar === "list" && <ReadingList />}
    </StyledLibrary>
  );
}

function Continue() {}

function ReadingList() {}

export default Library;
