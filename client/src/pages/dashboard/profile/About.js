import Story from "../../../components/Story";
import StyledAbout from "./styles/About.styled";
import { HiLocationMarker } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { Link, useOutletContext } from "react-router-dom";

function About() {
  const { profileData } = useOutletContext();

  return (
    <StyledAbout>
      <section className="info">
        <div className="pronouns">{profileData.profile.pronouns}</div>
        <div className="about">{profileData.profile.about}</div>
        <div className="location">
          <span className="icon">
            <HiLocationMarker />
          </span>
          <span>{profileData.profile.location}</span>
        </div>
        <div>{profileData.profile.website}</div>
      </section>
      <section className="stories">
        <header className="stories-header">
          <h3>
            <span>Stories by {profileData.profile.profileName}</span>
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
        {profileData.profile.stories?.map((story) => {
          return <Story key={story._id} story={story} />;
        })}
      </section>
    </StyledAbout>
  );
}

export default About;
