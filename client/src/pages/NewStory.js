import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { Alert, FormRow } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NewStory() {
  const navigate = useNavigate();
  const { reducerState, createStory } = useContext(AppContext);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createStory(title);
    navigate("/myStories");
  };

  return (
    <div className="container">
      {reducerState.showAlert && <Alert />}
      <form onSubmit={handleSubmit}>
        <FormRow
          type="text"
          name="title"
          value={title}
          handleChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewStory;
