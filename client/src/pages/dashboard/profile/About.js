import { useContext } from "react";
import { ProfileContext } from "../../../context/profileContext";

function About() {
  const { profileState } = useContext(ProfileContext);
  return (
    <div id="about">
      <ul>
        {profileState.stories.map((story) => {
          return (
            <li key={story._id}>
              <h1>{story.title}</h1>
              <p>{story.author}</p>
              <p>{story.description}</p>
              <p>{story.category}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default About;
