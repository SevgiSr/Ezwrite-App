import { Link } from "react-router-dom";
import StyledBrowse from "./styles/Browse.styled";
import { useQuery } from "@tanstack/react-query";
import { StoryContext } from "../../context/storyContext";
import { useContext, useState } from "react";
import { StoryCardDetailed, StoryCardRanked, Tag } from "../../components";

function Browse() {
  const { getAllStories, getTagSuggestions } = useContext(StoryContext);
  const [nav, setNav] = useState("category");

  const { data: catStories = [], isCatLoading } = useQuery(
    ["all", "stories"],
    () => getAllStories()
  );

  const { data: { stories, tags } = {}, isTagLoading } = useQuery(
    ["suggestions", "tags"],
    () => getTagSuggestions()
  );

  if (isCatLoading || isTagLoading) return null;

  return (
    <StyledBrowse>
      <header>
        <h1>Browse</h1>
      </header>
      <div className="browse-container">
        <nav>
          <div
            className={"nav-link " + (nav === "category" && "active")}
            onClick={() => setNav("category")}
          >
            By Category
          </div>
          <div
            className={"nav-link " + (nav === "tag" && "active")}
            onClick={() => setNav("tag")}
          >
            By Tag
          </div>
        </nav>

        {nav === "category" ? (
          <Categories stories={catStories} />
        ) : (
          <Tags stories={stories} tags={tags} />
        )}
      </div>
    </StyledBrowse>
  );
}

function Categories({ stories }) {
  return (
    <section className="explore-categories">
      <div className="category-list list">
        <div className="column">
          <div className="symbol">😍</div>
          <Link className="link" to={"/stories/fantasy"}>
            Fantasy
          </Link>
          <Link className="link" to={"/stories/romance"}>
            Romance
          </Link>
          <Link className="link" to={"/stories/action"}>
            Action
          </Link>
          <Link className="link" to={"/stories/fanfiction"}>
            Fanfinction
          </Link>
        </div>
        <div className="column">
          <div className="symbol">💀</div>
          <Link className="link" to={"/stories/horror"}>
            Horror
          </Link>
          <Link className="link" to={"/stories/mystery"}>
            Mystery
          </Link>
          <Link className="link" to={"/stories/paranormal"}>
            Paranormal
          </Link>
          <Link className="link" to={"/stories/vampire"}>
            Vampire/Werewolf
          </Link>
        </div>
        <div className="column">
          <div className="symbol">🤓</div>
          <Link className="link" to={"/stories/educational"}>
            Educational
          </Link>
          <Link className="link" to={"/stories/debate"}>
            Debate
          </Link>
          <Link className="link" to={"/stories/humor"}>
            Humor
          </Link>
          <Link className="link" to={"/stories/nonFiction"}>
            Non-fiction
          </Link>
        </div>
      </div>
      <div className="story-list">
        {stories.map((story, index) => {
          return (
            <div key={index} className="story">
              <StoryCardRanked story={story} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Tags({ stories, tags }) {
  return (
    <section className="explore-tags">
      <div className="tag-list list">
        {tags?.map((tag, index) => {
          return <Tag key={index} tag={tag} fontSize={"14px"} />;
        })}
      </div>

      <div className="story-list">
        {stories?.map((story, index) => {
          return (
            <div key={index} className="story">
              <StoryCardRanked story={story} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Browse;
