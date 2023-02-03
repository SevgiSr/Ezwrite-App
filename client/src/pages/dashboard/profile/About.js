import { useContext } from "react";
import Story from "../../../components/Story";
import { ProfileContext } from "../../../context/profileContext";
import StyledAbout from "./styles/About.styled";

function About() {
  const { profileState } = useContext(ProfileContext);
  return (
    <StyledAbout>
      <section className="info">
        <span>{profileState.profile.pronouns}</span>
        <div>{profileState.profile.about}</div>
        <span>{profileState.profile.location}</span>
        <span>{profileState.profile.website}</span>
      </section>
      <section className="stories">
        {profileState.stories.map((story) => {
          return <Story key={story._id} story={story} />;
        })}
      </section>
    </StyledAbout>
  );
}

export default About;
