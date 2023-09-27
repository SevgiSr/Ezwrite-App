import styled from "styled-components";
import UserLineMini from "../UserUI/UserLineMini";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { useContext } from "react";
import { MyStoryContext } from "../../context/myStoryContext";
import Cover from "../Cover";

function PullRequest({ pull, isOverview }) {
  const { mergeFork } = useContext(MyStoryContext);
  const navigate = useNavigate();
  const handleMergeChanges = async (fork) => {
    await mergeFork(fork._id);
    navigate(`/myworks/${fork.story._id}/${fork.story.chapters[0]}/writing`);
  };
  console.log(pull);
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
          <Cover filename={pull.fork.story._id} width="30px" />
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
              onClick={() => handleMergeChanges(pull.fork)}
            >
              Merge Changes
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
  }
`;

export default PullRequest;
