import styled from "styled-components";

const StyledUserCard = styled.article`
  width: fit-content;
  color: var(--font1);
  background-color: var(--background5);

  .background {
    margin-bottom: 1rem;
    filter: brightness(75%);
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .profilePicture {
      position: absolute;
      top: -70px;
    }
    .aliases {
      display: flex;
      flex-direction: column;
      text-align: center;

      .profileName {
        font-size: 18px;
        color: var(--font1);
        font-weight: 600;
      }
      .username {
        color: var(--font1);
      }
    }
    .profile-button {
      width: 70%;
      margin: 15px 0;
      display: flex;
      justify-content: center;
    }
    .info {
      display: flex;
      justify-content: space-around;
      background-color: var(--background3);
      color: var(--font2);
      padding: 10px 0;
      width: 100%;
      > * {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
        font-size: 20px;
        span {
          font-size: 14px;
        }
      }
    }
  }
`;

export default StyledUserCard;
