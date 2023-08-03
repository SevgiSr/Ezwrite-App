import StyledHome from "./styles/Home.styled";
import { StoryCardDetailed, UserCard } from "../../components";
import { useContext } from "react";
import { StoryContext } from "../../context/storyContext";
import { useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { ProfileContext } from "../../context/profileContext";
import SideNavbar from "./SideNavbar";

function Home() {
  const { getAllStories, getRecommendations } = useContext(StoryContext);
  const { getAllUsers } = useContext(ProfileContext);

  const { data: { popular = [], newAndPopular = [] } = {}, isStoriesLoading } =
    useQuery(["all", "recommendations"], () => getRecommendations());

  if (isStoriesLoading) return null;

  return (
    <StyledHome>
      <main>
        <div className="items-row">
          <h2>Popular</h2>
          <ScrollRow items={popular} />
        </div>
        <div className="items-row">
          <h2>New & Hot</h2>
          <ScrollRow items={newAndPopular} />
        </div>
        <div className="items-row">
          <h2>Recommended For You</h2>
          <ScrollRow items={popular} />
        </div>
      </main>
    </StyledHome>
  );
}

const ScrollRow = ({ items }) => {
  const [scrollX, setScrollX] = useState(0);
  const rowRef = useRef(null);
  const itemRef = useRef(null);
  const [listWidth, setListWidth] = useState(0);
  const listWidthRef = useRef(listWidth);
  const [innerWindowWidth, setInnerWindowWidth] = useState(
    window.innerWidth - 230
  );

  const setListWidthState = (state) => {
    listWidthRef.current = state;
    setListWidth(state);
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerWindowWidth(window.innerWidth - 230);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  useEffect(() => {
    setListWidthState(items.length * itemRef.current?.offsetWidth);
  }, [items]);

  //marginLeft is eiher negative or zero

  // to move whole list box to the left (show items on the right) marginLeft should decrese (go negative)

  //marginLeft icreases as you scroll to the left, and is zero if you're at the beginning of the list
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(innerWindowWidth / 2); // scroll by the half of the screen size
    if (x > 0) {
      // if new margin is positive we scrolled too much. set to zero.
      x = 0;
    }
    setScrollX(x);
  };

  //marginLeft decreases as you scroll to the right
  const handleRightArrow = () => {
    let x = scrollX - Math.round(innerWindowWidth / 2);
    if (innerWindowWidth - listWidth > x) {
      // if the calculated new margin is more than the lenght of non-visible items it means we scrolled too much
      // and items cannot be scrolled further
      x = innerWindowWidth - listWidth - 120; // the margin from left edge should be list width minus screen size so than only the last screen-sized part is visible. plus the margin for last item
    }
    setScrollX(x);
  };

  if (!items) return null;

  return (
    <div className="row">
      {scrollX !== 0 && (
        <div className="row--left" onClick={handleLeftArrow}>
          <FaAngleLeft />
        </div>
      )}

      {innerWindowWidth - listWidth <= scrollX && (
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
                  <StoryCardDetailed key={uuidv4()} story={item} />
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
