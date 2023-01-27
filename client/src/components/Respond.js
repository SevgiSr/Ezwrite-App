import { useState } from "react";
import StyledRespond from "./styles/Respond.styled";

function Respond({ dest, addComment }) {
  const [comment, setComment] = useState("");
  const [active, setActive] = useState(false);
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(dest, comment);
    setComment("");
  };

  return (
    <StyledRespond>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          value={comment}
          onChange={handleChange}
          cols="30"
          onFocus={() => setActive(true)}
          rows={active ? "3" : "0"}
        ></textarea>
        {active && <button type="submit">Share</button>}
      </form>
    </StyledRespond>
  );
}

export default Respond;
