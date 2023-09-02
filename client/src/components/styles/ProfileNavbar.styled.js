import styled from "styled-components";

const StyledProfileNavbar = styled.div`
  border-bottom: 1px solid var(--background1);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: var(--background3);
  color: var(--font2);

  .parent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .navbar-overlay {
    background-color: var(--background5);
    opacity: 0.75;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .buttons {
    display: flex;
    border: var(--background3);
  }

  .collab-modal {
    padding: 20px 15px;
    .collab-title {
      margin: 0 auto;
      width: fit-content;
      font-size: 23px;
    }

    .collab-stories-row {
      display: flex;
      align-items: center;
      height: fit-content;
    }

    .story-card-minimal {
      display: flex;
      flex-direction: row;
      padding: 1rem;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;

      .content {
        margin-left: 10px;

        .title {
          color: var(--font1);
          text-decoration: none;
          font-size: 25px;
          font-weight: 600;
          border-bottom: 2px solid transparent;
        }

        .meta-data {
          color: var(--font2);
          display: flex;
          font-size: 12px;
          width: fit-content;
          > * {
            display: flex;
            margin-right: 10px;
            .icon {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 3px;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 500px) {
    button {
      .btn-text {
        display: none;
      }
      .icon {
        font-size: 20px;
      }
    }
  }
`;

export default StyledProfileNavbar;
