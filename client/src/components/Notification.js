import { Link } from "react-router-dom";
import StyledNotification from "./styles/Notification.styled";
import ProfilePicture from "./ProfilePicture";
import he from "he";
import { FaComment, FaEnvelope } from "react-icons/fa";
import getDate from "../utils/getDate";
import Cover from "./Cover";

function Notification({ nt, isActivity = false }) {
  return (
    <StyledNotification>
      <Link
        key={nt._id}
        to={nt.route}
        style={{ textDecoration: "none" }}
        className="notification"
      >
        <div className="profilePicture">
          <ProfilePicture
            filename={nt.sender?._id}
            width="35px"
            height="35px"
          />
        </div>
        <div style={{ marginRight: "13px" }}>
          <header
            dangerouslySetInnerHTML={{
              __html: `<div>${
                isActivity
                  ? he.decode(nt.activity ? nt.activity : "")
                  : he.decode(nt.text ? nt.text : "")
              }</div>`,
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
            <ProfilePicture filename={nt.location} width="45px" height="45px" />
          </div>
        )}
        {nt.type === "story" && (
          <div style={{ marginLeft: "auto" }} className="story">
            <Cover filename={nt.location} width="45px" />
          </div>
        )}
      </Link>
    </StyledNotification>
  );
}

export default Notification;
