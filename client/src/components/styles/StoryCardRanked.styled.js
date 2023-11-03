import styled from "styled-components";

const StyledStoryCardRanked = styled.div`
  position: relative;

  .story-ranked {
    padding: 15px 20px;
    border-radius: 15px;
    background-color: var(--background2);
    cursor: pointer;

    .title {
      font-size: 16px;
      margin-top: 5px;
      text-align: center;
      position: relative;
      color: var(--font2);
    }

    .rank-container {
      position: absolute;
      top: -13px;
      left: -13px;
      display: flex;
      align-items: center;
      justify-content: center;
      .rank-icon {
        transform: rotate(-20deg);
        position: relative;
        color: #d4af37;
        font-size: 50px;

        .rank {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          color: var(--font1);
          font-weight: 600;
          font-size: 21px;
          text-shadow: 2px 2px 3px black;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .rank-cat {
        font-size: 18px;
        color: var(--font1);
        font-weight: 600;
        text-shadow: 2px 2px 3px black;
      }
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
