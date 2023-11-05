import styled from "styled-components";
import UserLineMini from "../UserUI/UserLineMini";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckLg, BsFillEyeFill, BsXLg } from "react-icons/bs";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import Cover from "../Cover";
import { useState } from "react";
import { useEffect } from "react";

function PullRequest({ pull, isOverview }) {
  const { useMergeFork, useDeclinePullRequest } = useContext(MyStoryContext);
  const declinePullRequestMutation = useDeclinePullRequest();
  const mergeForkMutation = useMergeFork();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleMergeClick = async (fork) => {
    mergeForkMutation.mutate({ fork_id: fork._id });
    // navigate(`/myworks/${fork.story._id}/${fork.story.chapters[0]}/writing`);
  };

  const handleDeclineClick = async (pull_id) => {
    declinePullRequestMutation.mutate({ req_id: pull_id });
  };

  return (
    <StyledPullRequest>
      {isOverview ? (
        <Link
          to={`/manage/${pull.fork.story._id}/pull-requests/`}
          className="overview"
        >
          <div>
            <div className="pull-header">
              <UserLineMini user={pull.fork.collaborator} />
              <div className="pull-text">
                requests you to merge their changes with your story{" "}
                <b>{pull.fork.story.title}</b>
              </div>
            </div>
            <div className="pull-main">
              <div className="title">{pull.title} </div>
              <div className="desc">{pull.description}</div>
            </div>
          </div>
          <Cover filename={pull.fork.story._id} width="30px" isStatic={true} />
        </Link>
      ) : (
        <div className="detailed">
          <div className="pull-main">
            <div className="title">{pull.title} </div>
            <div className="desc">{pull.description}</div>
            <div className="author">
              <div className="text">sent by</div>
              <UserLineMini
                user={pull.fork.collaborator}
                width="21px"
                fontSize="14px"
              />
            </div>
          </div>
          <div className="actions">
            <Link
              className="preview-btn btn btn-link"
              to={`/fork/${pull.fork._id}/${pull.fork.chapters[0]._id}`}
            >
              <div className="icon">
                <BsFillEyeFill />
              </div>
              Preview
            </Link>
            <button
              className="btn btn-basic"
              onClick={() => handleMergeClick(pull.fork)}
            >
              {windowWidth > 790 ? (
                "Merge Changes"
              ) : (
                <div className="icon accept-icon">
                  <BsCheckLg />
                </div>
              )}
            </button>
            <button
              className="btn btn-grey"
              onClick={() => handleDeclineClick(pull._id)}
            >
              {windowWidth > 790 ? (
                "Decline Changes"
              ) : (
                <div className="icon decline-icon">
                  <BsXLg />
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </StyledPullRequest>
  );
}

const StyledPullRequest = styled.div`
  padding: 13px 20px;
  background-color: var(--background2);
  cursor: pointer;
  :hover {
    background-color: var(--background1);
  }

  .overview {
    display: flex;
    align-items: center;
    justify-content: start;
    text-decoration: none;
    color: var(--font1);
    > :last-child {
      margin-left: auto;
    }

    .pull-header {
      display: flex;
      align-items: center;
    }

    .pull-main {
      margin-top: 10px;
      padding-left: 10px;
      border-left: 3px solid white;
    }
  }

  .detailed {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pull-text {
    color: var(--font2);
    margin-left: 10px;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
  }
  .desc {
    color: var(--font2);
  }
  .author {
    display: flex;
    align-items: center;
    font-size: 14px;
    margin-top: 10px;
    .text {
      margin-right: 10px;
    }
  }

  .actions {
    display: flex;
    .preview-btn {
      display: flex;
      width: fit-content;
      .icon {
        margin-right: 5px;
        font-size: 18px;
      }
    }
    .decline-icon {
      color: red;
    }
    .accept-icon {
      color: green;
    }
  }

  @media only screen and (max-width: 540px) {
    .collab-text {
      font-size: 12px;
    }
    .actions {
      flex-direction: column;
      align-items: center;

      .btn {
        margin-bottom: 5px;
      }

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
        background-color: var(--background4);
        .icon {
          margin-right: 0;
        }
      }
    }
  }
`;

export default PullRequest;
