import StyledAbout from "./styles/About.styled";
import { HiLocationMarker } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { Link, useOutletContext } from "react-router-dom";
import { ReadingLists, Story } from "../../../components";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import getDate from "../../../utils/getDate";
import { FiLink } from "react-icons/fi";

function About() {
  const { profileData } = useOutletContext();

  const { stories, profileName, about, pronouns, location, website } =
    profileData.profile;

  const [showStories, setShowStories] = useState(3);

  return (
    <StyledAbout>
      <section className="info">
        {pronouns && <div className="pronouns">{pronouns}</div>}
        {about && <div className="about">{about}</div>}
        {location && (
          <div className="location">
            <span className="icon">
              <HiLocationMarker />
            </span>
            <span>{location}</span>
          </div>
        )}
        <div className="joined">
          <span>Joined</span> {getDate(profileData.profile.createdAt)}
        </div>
        {website && (
          <div className="website">
            <span className="icon">
              <FiLink />
            </span>
            <span className="text">{website}</span>
          </div>
        )}
      </section>
      <section className="work-info">
        <div className="stories">
          <header className="stories-header">
            <h3>
              <span>Stories by {profileName}</span>
              <span className="edit-icon">
                <Link to="/workspace/myStories/" className="btn btn-basic">
                  Go to Workspace
                </Link>
              </span>
            </h3>

            <div className="meta-data">
              <span>
                {
                  stories.filter((story) => story.visibility === "published")
                    .length
                }{" "}
                Published Stories
              </span>
              {profileData.isMainUser && (
                <span>
                  {
                    stories.filter((story) => story.visibility === "draft")
                      .length
                  }{" "}
                  Drafts (only visible to you)
                </span>
              )}
            </div>
          </header>
          {stories.slice(0, showStories)?.map((story) => {
            return <Story key={story._id} story={story} />;
          })}
          {!(showStories >= stories.length - 1) && (
            <button
              className="show-more"
              onClick={() => setShowStories((prev) => prev + 5)}
            >
              <span>Show more</span>
              <span className="icon">
                <BsChevronDown />
              </span>
            </button>
          )}
        </div>
        {profileData.profile.readingLists?.length > 0 && (
          <div className="readingLists">
            <header>
              {profileData.profile.readingLists.length} Reading Lists
            </header>
            <ReadingLists readingLists={profileData.profile.readingLists} />
          </div>
        )}
      </section>
    </StyledAbout>
  );
}

export default About;
