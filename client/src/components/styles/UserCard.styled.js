import styled from "styled-components";

const StyledUserCard = styled.article`
  width: fit-content;

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
        color: #000;
        font-size: 18px;
      }
      .username {
        color: #6f6f6f;
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
      background-color: #f0fbfb;
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
