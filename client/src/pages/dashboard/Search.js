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
      <div>
        <h1>"{query}"</h1>
        <span className="results">{state.stories.length} results</span>
        <div className="filters">
          <div className="filter">
            <h4 className="title">Length</h4>
            <Option
              id="any"
              label="Any Length"
              selectedValue={selectedLength}
              onChange={handleLengthChange}
            />
            <Option
              id="1-10"
              label="1-10 Parts"
              selectedValue={selectedLength}
              onChange={handleLengthChange}
            />
            <Option
              id="10-20"
              label="10-20 Parts"
              selectedValue={selectedLength}
              onChange={handleLengthChange}
            />
            <Option
              id="20-50"
              label="20-50 Parts"
              selectedValue={selectedLength}
              onChange={handleLengthChange}
            />
            <Option
              id="50-more"
              label="50 Parts or more"
              selectedValue={selectedLength}
              onChange={handleLengthChange}
            />
          </div>
        </div>
      </div>
      <div className="stories">
        {state.stories.map((story) => {
          return (
            <div className="card">
              <StoryCardDetailed key={story._id} story={story} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
