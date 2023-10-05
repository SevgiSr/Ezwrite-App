import { useLocation, useParams } from "react-router-dom";
import StyledReadingList from "./styles/ReadingList.styled";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { StoryCardDetailed } from "../../components";
import { AiTwotoneEdit } from "react-icons/ai";

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
      <header>
        <h2>Reading List</h2>
        <h1>
          {readingList.title}{" "}
          <icon>
            <AiTwotoneEdit />
          </icon>
        </h1>
      </header>
      <div className="main">
        {readingList.stories?.map((story) => {
          return (
            <div className="item">
              <StoryCardDetailed key={story._id} story={story} />
            </div>
          );
        })}
      </div>
    </StyledReadingList>
  );
}

export default ReadingList;
