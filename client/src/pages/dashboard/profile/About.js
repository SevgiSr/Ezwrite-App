import { useContext } from "react";
import Story from "../../../components/Story";
import { ProfileContext } from "../../../context/profileContext";
import StyledAbout from "./styles/About.styled";

function About() {
  const { profileState } = useContext(ProfileContext);
  return (
    <StyledAbout>
      <div className="container">
        <section className="about">elelelellelelelelelelelelel</section>
        <section className="stories">
          {profileState.stories.map((story) => {
            return <Story key={story._id} story={story} />;
          })}
        </section>
      </div>
    </StyledAbout>
  );
}

export default About;
