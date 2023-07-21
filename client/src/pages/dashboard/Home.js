import StyledHome from "./styles/Home.styled";
import { StoryDetailed, UserCard } from "../../components";
import { useContext } from "react";
import { StoryContext } from "../../context/storyContext";
import { useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const { getAll } = useContext(StoryContext);

  const { data: { stories, users } = {}, isLoading } = useQuery(["home"], () =>
    getAll()
  );

  if (isLoading) return null;

  return (
    <StyledHome>
      <div className="items-row">
        <h1>Explore Users</h1>
        <ScrollRow items={users} type="user" />
      </div>
      <div className="items-row">
        <h1>Popular</h1>
        <ScrollRow items={stories} type="story" />
      </div>
      <div className="items-row">
        <h1>Recommended For You</h1>
        <ScrollRow items={stories} type="story" />
      </div>
      <div className="items-row">
        <h1>New & Hot</h1>
        <ScrollRow items={stories} type="story" />
      </div>
    </StyledHome>
  );
}

const ScrollRow = ({ items, type }) => {
  const [scrollX, setScrollX] = useState(0);
  const rowRef = useRef(null);
  const itemRef = useRef(null);
  const [listWidth, setListWidth] = useState(0);
  const listWidthRef = useRef(listWidth);

  const setListWidthState = (state) => {
    listWidthRef.current = state;
    setListWidth(state);
  };

  useEffect(() => {
    setListWidthState(items.length * itemRef.current?.offsetWidth);
  }, [items]);

  //marginLeft is eiher negative or zero

  // to move whole list box to the left (show items on the right) marginLeft should decrese (go negative)

  //marginLeft icreases as you scroll to the left, and is zero if you're at the beginning of the list
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2); // scroll by the half of the screen size
    if (x > 0) {
      // if new margin is positive we scrolled too much. set to zero.
      x = 0;
    }
    setScrollX(x);
  };

  //marginLeft decreases as you scroll to the right
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    if (window.innerWidth - listWidth > x) {
      // if the calculated new margin is more than the lenght of non-visible items it means we scrolled too much
      // and items cannot be scrolled further
      x = window.innerWidth - listWidth - 120; // the margin from left edge should be list width minus screen size so than only the last screen-sized part is visible. plus the margin for last item
    }
    setScrollX(x);
  };

  return (
    <div className="row">
      {scrollX !== 0 && (
        <div className="row--left" onClick={handleLeftArrow}>
          <FaAngleLeft />
        </div>
      )}

      {window.innerWidth - listWidth <= scrollX && (
        <div className="row--right" onClick={handleRightArrow}>
          <FaAngleRight />
        </div>
      )}

      <div className="row--list" ref={rowRef}>
        <div
          className="row--list-wrapper"
          style={{
            marginLeft: scrollX,
          }}
        >
          <>
            {items.map((item) => {
              return (
                <div className="row--item" ref={itemRef}>
                  {type === "story" ? (
                    <StoryDetailed key={uuidv4()} story={item} />
                  ) : (
                    <UserCard key={item._id} user={item} />
                  )}
                </div>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
};

export default Home;
