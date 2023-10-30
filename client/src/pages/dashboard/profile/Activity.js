import ProfilePicture from "../../../components/ProfilePicture";
import he from "he";
import { FaComment, FaEnvelope } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import getDate from "../../../utils/getDate";
import StyledActivity from "./styles/Activity.styled";
import Cover from "../../../components/Cover";
import { Notification } from "../../../components";

function Activity() {
  const { profileData } = useOutletContext();

  return (
    <StyledActivity>
      <div className="column-reverse">
        {profileData.profile.activity?.map((nt) => {
          return <Notification key={nt._id} nt={nt} isActivity={true} />;
        })}
      </div>
    </StyledActivity>
  );
}

export default Activity;
