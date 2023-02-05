import { useState } from "react";
import StyledRespond from "./styles/Respond.styled";
import ProfilePicture from "./ProfilePicture";
import { useRef } from "react";
import { useEffect } from "react";

function Respond({ dest, addComment }) {
  const [comment, setComment] = useState("");
  const initialState = { comment: "", share: "" };
  const [show, setShow] = useState(initialState);

  const stateRef = useRef(show);

  const setShowState = (state) => {
    stateRef.current = state;
    setShow(state);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    setShow(initialState);
    addComment(dest, comment);
    setComment("");
  };

  const texareaRef = useRef();
  const buttonRef = useRef();

  const listener = (e) => {
    if (e.target !== buttonRef.current && e.target !== texareaRef.current) {
      setShowState(initialState);
    } else {
      setShowState({
        ...stateRef.current,
        [e.target.name]: `${e.target.name}-show`,
      });
    }
  };
  useEffect(() => {
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <StyledRespond>
      <form onSubmit={handleSubmit}>
        <ProfilePicture width="10%" height="10%" />
        <textarea
          className={show.comment}
          ref={texareaRef}
          name="comment"
          value={comment}
          onChange={handleChange}
          cols="30"
          rows="1"
        ></textarea>
        <button
          className={`${show.share} orange-button`}
          name="share"
          ref={buttonRef}
          type="submit"
        >
          Share
        </button>
      </form>
    </StyledRespond>
  );
}

export default Respond;
