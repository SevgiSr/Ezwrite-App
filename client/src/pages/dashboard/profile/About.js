import { useContext } from "react";
import Story from "../../../components/Story";
import { ProfileContext } from "../../../context/profileContext";
import StyledAbout from "./styles/About.styled";
import { HiLocationMarker } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";

function About() {
  const { profileState } = useContext(ProfileContext);
  return (
    <StyledAbout>
      <section className="info">
        <div className="pronouns">{profileState.profile.pronouns}</div>
        <div className="about">{profileState.profile.about}</div>
        <div className="location">
          <span className="icon">
            <HiLocationMarker />
          </span>
          <span>{profileState.profile.location}</span>
        </div>
        <div>{profileState.profile.website}</div>
      </section>
      <section className="stories">
        <header className="stories-header">
          <h3>
            <span>Stories by {profileState.profile.profileName}</span>
            <span className="edit-icon">
              <Link to="/myStories">
                <MdSettings />
              </Link>
            </span>
          </h3>

          <div className="meta-data">
            <span>0 Published Stories</span>
            <span>3 Drafts (only visible to you)</span>
          </div>
        </header>
        {profileState.stories.map((story) => {
          return <Story key={story._id} story={story} />;
        })}
      </section>
    </StyledAbout>
  );
}

export default About;
