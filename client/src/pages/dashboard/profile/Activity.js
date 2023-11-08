import ProfilePicture from "../../../components/ProfilePicture";
import he from "he";
import { FaComment, FaEnvelope } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import getDate from "../../../utils/getDate";
import StyledActivity from "./styles/Activity.styled";
import Cover from "../../../components/Cover";
import { Notification } from "../../../components";
import { FiActivity } from "react-icons/fi";

function Activity() {
  const { profileData } = useOutletContext();

  return (
    <StyledActivity>
      {profileData.profile.activity.length === 0 ? (
        <div className="no-content-container">
          <div className="icon">
            <FiActivity />
          </div>
          <div className="text">This user doesn't have any activity.</div>
        </div>
      ) : (
        <div className="column-reverse">
          {profileData.profile.activity?.map((nt) => {
            return <Notification key={nt._id} nt={nt} isActivity={true} />;
          })}
        </div>
      )}
    </StyledActivity>
  );
}

export default Activity;
