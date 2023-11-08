import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../context/storyContext";
import { Link, useParams } from "react-router-dom";
import { Story, StoryCardDetailed } from "../../components";
import StyledStories from "./styles/Stories.styled";
import ProfilePicture from "../../components/ProfilePicture";
import { UserCard } from "../../components";

function Option({ id, label, selectedValue, onChange }) {
  const isSelected = selectedValue === id;
  const handleChange = () => {
    onChange(id);
  };
  return (
    <div className="option" onClick={handleChange}>
      <input
        value={isSelected}
        onChange={handleChange}
        id={id}
        type="radio"
        checked={isSelected}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function Search() {
  const [search, setSearch] = useState("");
  const { state, getByCategory, getByQuery, getByTag } =
    useContext(StoryContext);
  const params = useParams();

  useEffect(() => {
    if (params.query) {
      getByQuery(params.query);
      setSearch("stories");
    } else if (params.category) {
      console.log(params.category);
      getByCategory(params.category);
      setSearch("stories");
    } else if (params.tag) {
      getByTag(params.tag);
      setSearch("stories");
    }
  }, [params]);

  return (
    <StyledStories>
      <header className="search-header">
        <button
          className={`${search === "stories" && "active"}`}
          onClick={(e) => setSearch("stories")}
        >
          Stories
        </button>
        <button
          className={`${search === "users" && "active"}`}
          onClick={(e) => setSearch("users")}
          disabled={params.category}
        >
          Users
        </button>
      </header>
      {search === "users" ? <Users /> : <Stories />}
    </StyledStories>
  );
}

function Users() {
  const { state } = useContext(StoryContext);
  return (
    <div className="users-parent">
      {state.users.map((user) => {
        return (
          <div key={user._id} className="user">
            <UserCard user={user} />
          </div>
        );
      })}
    </div>
  );
}

function Stories() {
  const { state } = useContext(StoryContext);

  const [selectedLength, setSelectedLength] = useState("any");
  const { query } = useParams();
  const handleLengthChange = (length) => {
    setSelectedLength(length);
    console.log(length);
  };
  return (
    <div className="stories-parent">
      <div className="results-container">
        <h1>"{query}"</h1>
        <span className="results">{state.stories.length} results</span>
      </div>
      <div className="stories">
        {state.stories.map((story) => {
          return (
            <div className="story-item">
              <StoryCardDetailed key={story._id} story={story} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
