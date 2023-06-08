import { useLocation, useParams } from "react-router-dom";
import StyledReadingList from "./styles/ReadingList.styled";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { StoryDetailed } from "../../components";

function ReadingList() {
  const location = useLocation();
  const { list_id } = useParams();

  console.log(list_id);
  const [readingList, setReadingList] = useState({});

  const { getLibrary } = useContext(StoryContext);

  const {
    data: { continueReading, readingLists } = {},
    isLoading,
    isFetching,
    status,
  } = useQuery(["library"], getLibrary, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    //this works at refresh and reloads too
    if (!isFetching && status === "success") {
      const filteredList = readingLists.find((list) => list._id === list_id);
      console.log(filteredList);
      if (filteredList) {
        setReadingList(filteredList);
      }
    }
  }, [location, isFetching]);

  return (
    <StyledReadingList>
      <h1>{readingList.title}</h1>
      {readingList.stories?.map((story) => {
        return <StoryDetailed key={story._id} story={story} />;
      })}
    </StyledReadingList>
  );
}

export default ReadingList;
