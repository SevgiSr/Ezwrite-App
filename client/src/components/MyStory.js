import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyStoryContext } from "../context/myStoryContext";

const MyStory = ({ _id, title, author }) => {
  const navigate = useNavigate();
  const { setEditStory } = useContext(MyStoryContext);

  const handleClick = () => {
    navigate(`/${_id}`);
    setEditStory(_id);
  };
  return (
    <div>
      <h1>{title}</h1>
      {/*       <h2>{author._id}</h2> */}
      <h2>{author.name}</h2>
      <button onClick={handleClick}>Edit Story</button>
    </div>
  );
};

//learn how to add param routes

export default MyStory;
