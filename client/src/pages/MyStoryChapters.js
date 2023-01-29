import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyStoryContext } from "../context/myStoryContext";

function MyStoryChapters() {
  const navigate = useNavigate();
  const { storyState, getMyChapters, editChapter, addChapter } =
    useContext(MyStoryContext);
  const { story_id } = useParams();

  useEffect(() => {
    getMyChapters(story_id);
  }, []);

  // using storyState for id's is bad
  // beause when you refresh the page storyState zeros out and now you're sending request with undefined id's
  // use params to get id's instead
  const handleEditClick = (story_id, chapter_id) => {
    editChapter(story_id, chapter_id);
    navigate(`/${story_id}/${chapter_id}/writing`);
  };

  const handleAddClick = async () => {
    const newChapter_id = await addChapter(story_id);
    navigate(`/${story_id}/${newChapter_id}/writing`);
  };

  return (
    <div className="container">
      {storyState.chapters.map((chapter) => {
        return (
          <div key={chapter._id}>
            <h1>{chapter._id}</h1>
            <h1>{chapter.title}</h1>
            <button onClick={() => handleEditClick(story_id, chapter._id)}>
              edit chapter
            </button>
          </div>
        );
      })}
      <button onClick={handleAddClick}>Add chapter</button>
    </div>
  );
}

export default MyStoryChapters;
