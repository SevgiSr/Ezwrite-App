import styled from "styled-components";
import UserLine from "../UserUI/UserLine";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import { Link } from "react-router-dom";
import StoryCardMini from "../StoryUI/StoryCardMini";
import Cover from "../Cover";
import { useState } from "react";
import { useEffect } from "react";
import { BsCheck, BsCheck2, BsCheckLg, BsXLg } from "react-icons/bs";

function CollabRequest({ collab, isOverview }) {
  const { useGrantCollaboratorAccess, useDeclineCollaboratorAccess } =
    useContext(MyStoryContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const declineCollaboratorAccessMutation = useDeclineCollaboratorAccess();
  const grantCollaboratorAccessMutation = useGrantCollaboratorAccess();

  const handleAcceptRequestClick = (collab) => {
    grantCollaboratorAccessMutation.mutate({
      story_id: collab.story._id,
      user_id: collab.user._id,
    });
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
              {windowWidth > 790 ? (
                "Decline Request"
              ) : (
                <div className="icon decline-icon">
                  <BsXLg />
                </div>
              )}
            </button>
            <button
              className="collab-btn btn btn-basic"
              type="button"
              onClick={() => handleAcceptRequestClick(collab)}
            >
              {windowWidth > 790 ? (
                "Accept Request"
              ) : (
                <div className="icon accept-icon">
                  <BsCheckLg />
                </div>
              )}
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
    color: var(--font2);
  }
  .actions {
    display: flex;
    margin-left: auto;
    button {
      .decline-icon {
        color: red;
      }
      .accept-icon {
        color: green;
      }
    }
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

  @media only screen and (max-width: 540px) {
    .collab-text {
      font-size: 12px;
    }
    .actions {
      button {
        font-size: 12px;
        .icon {
          margin-right: 0;
        }
      }
    }
  }

  @media only screen and (max-width: 790px) {
    .actions {
      button {
        .icon {
          margin-right: 0;
        }
      }
    }
  }
`;

export default CollabRequest;
