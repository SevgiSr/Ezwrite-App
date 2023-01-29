import { useState } from "react";
import StyledRespond from "./styles/Respond.styled";
import ProfilePicture from "./ProfilePicture";

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
      <ProfilePicture width="40px" height="40px" />
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          value={comment}
          onChange={handleChange}
          cols="30"
          rows="1"
        ></textarea>
        <button type="submit">Share</button>
      </form>
    </StyledRespond>
  );
}

export default Respond;
