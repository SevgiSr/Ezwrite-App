import styled from "styled-components";

const StyledUserCard = styled.article`
  width: 100%;
  color: var(--font1);
  background-color: var(--background1);

  .background {
    margin-bottom: 1rem;
    filter: brightness(55%);
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
      margin: 10px 0;
      display: flex;
      justify-content: center;
    }
    .info {
      display: flex;
      justify-content: space-around;
      background-color: var(--background4);
      color: var(--font2);
      padding: 10px 0;
      width: 100%;
      > * {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        font-size: 16px;
        span {
          font-size: 13px;
        }
      }
    }
  }
`;

export default StyledUserCard;
