import styled from "styled-components";

const StyledMyStory = styled.div`
  display: flex;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;

  .story-title {
    width: fit-content;
  }
  .story-title:hover {
    border-bottom: 2px solid black;
    cursor: pointer;
  }
  button > * {
    pointer-events: none;
  }

  .edit-dropdown-menu {
    display: block;
    padding: 0.75rem 0;
    width: 100%;
    border-radius: 0;
    overflow: scroll;
    max-height: 200px;
    .dropdown-items {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .dropdown-item {
        font-size: 12px;
        text-align: start;
        border-bottom: 1px solid #eee;
        width: 80%;
        p {
          color: #6f6f6f;
        }
      }
    }
  }

  /*   .edit-dropdown-menu::after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    background-color: #222;
  } */
  .cover {
    margin-right: 0.7rem;
  }

  .info {
    text-align: start;
    margin-right: 2rem;
  }

  .buttons {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    .orange-button {
      position: relative;
      padding: 9px 50px;
      .text {
        padding-right: 20px;
      }
      .down-icon {
        font-size: 20px;
        position: absolute;
        right: 10px;
        padding-left: 16px;
        border-left: 1px solid #fafafa;
      }
    }
    .white-button {
      color: #222;
      font-size: 13px;
      font-weight: 500;
      padding: 2px 3px;
      width: 50%;
    }
  }
`;

export default StyledMyStory;
