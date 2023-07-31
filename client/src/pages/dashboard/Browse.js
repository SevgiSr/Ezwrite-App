import { Link } from "react-router-dom";
import StyledBrowse from "./styles/Browser.styled";
import { useQuery } from "@tanstack/react-query";
import { StoryContext } from "../../context/storyContext";
import { useContext } from "react";
import { StoryCardDetailed, StoryCardRanked } from "../../components";

function Browse() {
  const { getAllStories } = useContext(StoryContext);

  const { data: stories = [], isStoriesLoading } = useQuery(
    ["all", "stories"],
    () => getAllStories()
  );

  if (isStoriesLoading) return null;
  return (
    <StyledBrowse>
      <Categories stories={stories} />
      <Tags stories={stories} />
    </StyledBrowse>
  );
}

function Categories({ stories }) {
  return (
    <section className="explore-categories">
      <div className="category-list list">
        <div className="column">
          <div className="symbol">😍</div>
          <Link to={"/stories/fantasy"}>Fantasy</Link>
          <Link to={"/stories/romance"}>Romance</Link>
          <Link to={"/stories/action"}>Action</Link>
          <Link to={"/stories/fanfiction"}>Fanfinction</Link>
        </div>
        <div className="column">
          <div className="symbol">💀</div>
          <Link to={"/stories/horror"}>Horror</Link>
          <Link to={"/stories/mystery"}>Mystery</Link>
          <Link to={"/stories/paranormal"}>Paranormal</Link>
          <Link to={"/stories/vampire"}>Vampire/Werewolf</Link>
        </div>
        <div className="column">
          <div className="symbol">🤓</div>
          <Link to={"/stories/educational"}>Educational</Link>
          <Link to={"/stories/debate"}>Debate</Link>
          <Link to={"/stories/humor"}>Humor</Link>
          <Link to={"/stories/nonFiction"}>Non-fiction</Link>
        </div>
      </div>
      <div className="story-list">
        {stories.map((story) => {
          return (
            <div key={story._id} className="story">
              <StoryCardRanked story={story} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Tags() {
  const { getTagSuggestions } = useContext(StoryContext);
  const { data: { stories, tags } = {}, isStoriesLoading } = useQuery(
    ["suggestions", "tags"],
    () => getTagSuggestions()
  );

  console.log(stories);

  if (isStoriesLoading) return null;

  return (
    <section className="explore-tags">
      <div className="tag-list list">
        {tags?.map((tag) => {
          return (
            <div className="tag">
              {tag.name} ({tag.count})
            </div>
          );
        })}
      </div>

      <div className="story-list">
        {stories?.map((story) => {
          return (
            <div key={story._id} className="story">
              <StoryCardRanked story={story} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Browse;
