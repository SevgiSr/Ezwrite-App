import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyStoryContext } from "../context/myStoryContext";
import StyledMyStory from "./styles/MyStory.styled";
import Cover from "./Cover";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const MyStory = ({ story }) => {
  const navigate = useNavigate();
  const { setEditStory } = useContext(MyStoryContext);

  const [edit, setEdit] = useState("");

  const stateRef = useRef(edit);

  const setEditState = (state) => {
    stateRef.current = state;
    setEdit(state);
  };

  const handleClick = () => {
    navigate(`/${story._id}`);
    setEditStory(story._id);
  };

  const listener = (e) => {
    if (
      e.target !== storyMenuRef.current &&
      e.target !== storyButtonRef.current
    ) {
      setEditState("");
    } else if (e.target === storyButtonRef.current) {
      if (stateRef.current === "") {
        setEditState("show");
      } else {
        setEditState("");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  const storyMenuRef = useRef();
  const storyButtonRef = useRef();

  return (
    <StyledMyStory>
      <div className="cover">
        <Cover width="80px" height="125px" />
      </div>
      <div className="info">
        <h3 className="story-title" onClick={handleClick}>
          {story.title}
        </h3>
        <div className="publish-count">3 Taslak</div>
        <div className="update-date">
          <div className="date">Güncellenme Zamanı Oca 27, 2023</div>
          <div className="time">02:38PM</div>
        </div>
        <div className="meta-data"></div>
      </div>
      <div className="buttons">
        <div>
          <button ref={storyButtonRef} name="edit" className="orange-button">
            <span className="text">Edit Story</span>
            <span className="down-icon">
              <FiChevronDown />
            </span>
          </button>
          <div ref={storyMenuRef} className={"dropdown-menu-parent " + edit}>
            <div className="dropdown-menu edit-dropdown-menu">
              <div className="dropdown-items">
                {story.chapters.map((chapter) => {
                  return (
                    <Link
                      className="link"
                      key={chapter._id}
                      to={`/${story._id}/${chapter._id}/writing`}
                    >
                      <div className="dropdown-item">
                        {chapter.title}

                        <p>Taslak - Ocak 11, 2023</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button className="white-button">
          <span className="text">Delete Story</span>
        </button>
      </div>
    </StyledMyStory>
  );
};

//learn how to add param routes

export default MyStory;
