import styled from "styled-components";
import UserLine from "../UserUI/UserLine";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import { Link } from "react-router-dom";
import StoryCardMini from "../StoryUI/StoryCardMini";
import Cover from "../Cover";

function CollabRequest({ collab, isOverview }) {
  const { grantCollaboratorAccess, useDeclineCollaboratorAccess } =
    useContext(MyStoryContext);
  const declineCollaboratorAccessMutation = useDeclineCollaboratorAccess();

  const handleAcceptRequestClick = (collab) => {
    grantCollaboratorAccess(collab.story._id, collab.user._id);
  };
  const handleDeclineRequestClick = (collab_id) => {
    //mutating because I want to invaalidate queries on success
    console.log("decline click");
    declineCollaboratorAccessMutation.mutate({
      req_id: collab_id,
    });
  };
  return (
    <StyledCollabRequest>
      {isOverview ? (
        <Link
          to={`/manage/${collab.story._id}/collab-requests/`}
          className="overview"
        >
          <UserLine user={collab.user} />
          <div className="collab-text">
            wants to collaborate in your story <b>{collab.story.title}</b>
          </div>
          <Cover filename={collab.story._id} width="30px" />
        </Link>
      ) : (
        <div className="detailed">
          <UserLine user={collab.user} />
          <div className="collab-text">wants to collaborate in this story.</div>
          <div className="actions">
            <button
              className="collab-btn btn btn-basic"
              type="button"
              onClick={() => handleDeclineRequestClick(collab._id)}
            >
              Decline Request
            </button>
            <button
              className="collab-btn btn btn-basic"
              type="button"
              onClick={() => handleAcceptRequestClick(collab)}
            >
              Accept Request
            </button>
          </div>
        </div>
      )}
    </StyledCollabRequest>
  );
}

const StyledCollabRequest = styled.div`
  padding: 13px 20px;
  background-color: var(--background2);
  box-shadow: 0 8px 12px rgb(18 18 18 / 16%);
  :hover {
    background-color: var(--background1);
  }

  .collab-text {
    margin: 0 10px;
  }
  .actions {
    margin-left: auto;
  }

  .overview {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--font1);
    > :last-child {
      margin-left: auto;
    }
  }

  .detailed {
    display: flex;
    align-items: center;
  }
`;

export default CollabRequest;
