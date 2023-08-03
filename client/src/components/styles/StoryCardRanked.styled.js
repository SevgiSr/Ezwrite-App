import styled from "styled-components";

const StyledStoryCardRanked = styled.div`
  /*   width: 100%;
  .title {
    width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
    overflow: hidden;
  } */

  position: relative;

  .story-ranked {
    background-color: var(--background3);
    padding: 10px 15px;
    border-radius: 15px;
    cursor: pointer;

    .title {
      font-size: 19px;
      text-align: center;
      position: relative;
      color: var(--font2);
      background-color: var(--background3);
    }
  }

  .details-modal {
    display: none;
    position: absolute;
    padding: 10px 15px;
    width: 230px;
    height: 180px;
    top: -187px;
    left: 50%; /* position the left edge of the element at the middle of the parent */
    transform: translate(-50%, 0);
    background-color: var(--background1);
    border-radius: 15px;

    ::after {
      content: "";
      position: absolute;
      bottom: -13px; /* Adjust these values to position your tail */
      left: 50%;
      width: 0;
      height: 0;
      border-left: 10px solid transparent; /* Size of the tail */
      border-right: 10px solid transparent; /* Size of the tail */
      border-top: 13px solid var(--background1); /* The color should match your modal's background color */
      transform: translateX(-50%); /* Center the tail */
    }

    .description {
      text-align: center;
      margin-top: 15px;
    }

    .metadata {
      position: absolute;
      bottom: 9px;
      left: 7px;
      right: 7px;
      background-color: var(--background2);
      padding: 3px 5px;
      border-radius: 20px;
    }
  }

  :hover .details-modal {
    display: block;
  }

  .close {
    display: none !important;
  }
`;

export default StyledStoryCardRanked;
