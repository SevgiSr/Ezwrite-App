import ProfilePicture from "../../../components/ProfilePicture";
import he from "he";
import { FaComment, FaEnvelope } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import getDate from "../../../utils/getDate";
import StyledActivity from "./styles/Activity.styled";
import Cover from "../../../components/Cover";

function Activity() {
  const { profileData } = useOutletContext();

  return (
    <StyledActivity>
      <div className="column-reverse">
        {profileData.profile.activity?.map((nt) => {
          return (
            <Link
              key={nt._id}
              to={nt.route}
              style={{ textDecoration: "none" }}
              className="notification"
            >
              <div className="profilePicture">
                <ProfilePicture
                  filename={nt.sender._id}
                  width="35px"
                  height="35px"
                />
              </div>
              <div style={{ marginRight: "13px" }}>
                <header
                  dangerouslySetInnerHTML={{
                    __html: `<div>${he.decode(nt.activity)}</div>`,
                  }}
                ></header>
                <div className="row">
                  {(nt.type === "conversation" || nt.type === "chapter") && (
                    <div className="icon">
                      <FaComment />
                    </div>
                  )}
                  {nt.type === "profile" && (
                    <div className="icon">
                      <FaEnvelope />
                    </div>
                  )}
                  <div className="date">{getDate(nt.createdAt)}</div>
                </div>
                <div className="content">{nt.content}</div>
              </div>
              {nt.type === "profile" && (
                <div style={{ marginLeft: "auto" }}>
                  <ProfilePicture
                    filename={nt.location}
                    width="45px"
                    height="45px"
                  />
                </div>
              )}
              {nt.type === "chapter" && (
                <div style={{ marginLeft: "auto" }} className="story">
                  <Cover filename={nt.location} width="45px" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </StyledActivity>
  );
}

export default Activity;
