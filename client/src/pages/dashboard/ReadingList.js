import { useLocation, useNavigate, useParams } from "react-router-dom";
import StyledReadingList from "./styles/ReadingList.styled";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { DynamicInput, StoryCardDetailed } from "../../components";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

function ReadingList() {
  const location = useLocation();
  const { list_id } = useParams();
  const { useUpdateListTitle, useDeleteList, useRemoveFromList } =
    useContext(StoryContext);
  const updateListTitleMutation = useUpdateListTitle();
  const deleteListMutation = useDeleteList();
  const removeFromListMutation = useRemoveFromList();

  const [readingList, setReadingList] = useState({});

  const navigate = useNavigate();

  const [isEditMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");

  const { getLibrary } = useContext(StoryContext);

  const formRef = useRef(null);

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
      if (filteredList) {
        setReadingList(filteredList);
      }
    }
  }, [location, isFetching]);

  const handleDeleteClick = () => {
    deleteListMutation.mutate({ list_id });
    navigate("/library");
  };

  const handleRemoveClick = (story_id) => {
    removeFromListMutation.mutate({ list_id, story_id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    setReadingList({ ...readingList, title: title });
    setEditMode(false);
    updateListTitleMutation.mutate({ list_id, title });
  };

  if (isLoading) return null;

  return (
    <StyledReadingList>
      <header>
        <div className="main-header">
          <h2>Reading List</h2>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="title">
              {readingList.title}{" "}
              <DynamicInput
                value={title}
                setValue={setTitle}
                handleChange={(e) => setTitle(e.target.value)}
                isOpen={isEditMode}
                setIsOpen={setEditMode}
                className={"title-input"}
                formRef={formRef}
              />
            </div>
            <div className="icon" onClick={() => setEditMode(true)}>
              <AiTwotoneEdit />
            </div>
          </form>
        </div>
        <button className="btn btn-alert" onClick={handleDeleteClick}>
          <div className="icon">
            <FaTrash />
          </div>
          <div className="text">Delete list</div>
        </button>
      </header>
      <div className="main">
        {readingList.stories?.map((story) => {
          return (
            <div className="item" key={story._id}>
              <StoryCardDetailed key={story._id} story={story} />
              <div
                className="remove-icon icon"
                onClick={() => handleRemoveClick(story._id)}
              >
                <CiCircleRemove />
              </div>
            </div>
          );
        })}
      </div>
    </StyledReadingList>
  );
}

export default ReadingList;
