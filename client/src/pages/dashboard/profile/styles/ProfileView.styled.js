import styled from "styled-components";

const StyledProfileView = styled.header`
  height: 340px;
  margin: 0 auto;
  background-color: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;

  .bc-overlay {
    position: absolute;
    z-index: -9;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #5c5d56;
    opacity: 0.3;
  }

  .background {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
    z-index: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }

  .edit-mode {
    width: 100vw;
    z-index: 1000;
    nav {
      display: flex;
      align-items: center;
      justify-content: end;
      height: 60px;
      position: fixed;
      top: 0;
      z-index: 1000;
      background-color: var(--background3);
      width: 100vw;
      button {
        margin-right: 50px;
        padding: 10px;
      }
    }
    #edit-overlay {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      opacity: 0.5;
      width: 100%;
      height: 370px;
      background: #099;
    }
  }

  #profile-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: var(--background3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 15px;

    .main-profile-info {
      position: relative;
      bottom: 20px;
      display: flex;
      align-items: end;
      .profile-picture {
        border: 15px solid var(--background3);
        border-radius: 100%;
        .icon {
          font-size: 60px;
          color: #fff;
          opacity: 0.5;
        }
        input {
          display: none;
        }
        .upload-picture {
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1999;
          background-color: transparent;
          cursor: pointer;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          position: absolute;
        }
      }

      .usernames {
        position: relative;
        right: 10px;
        margin-bottom: 10px;
        .profile-name {
          position: relative;
          font-size: 23px;
          margin-bottom: 3px;
          input {
            padding: 6px 15px;
            position: absolute;
            left: -10px;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            z-index: 1999;
            background: rgba(255, 255, 255, 0.667);
            border-radius: 5px;
            border: none;
            color: #6f6f6f;
            font-size: 24px;
            font-weight: 400;
            line-height: 31px;
            text-align: center;
          }
        }

        .username {
          font-size: 15px;
        }
      }
    }

    .extra-profile-info {
      .user-metadata {
        list-style: none;
        display: flex;

        li {
          margin: 0 1.2em;
          .info-btn {
            width: 100%;
            height: 100%;
            color: #fff;
            background-color: transparent;
            border: none;
            cursor: pointer;
            text-align: center;
            p {
              color: var(--font2);
              font-weight: 600;
            }
            .count {
              font-size: clamp(14px, 2vw, 18px);
            }
            .label {
              font-size: clamp(12px, 2vw, 15px);
            }
          }
        }
      }
    }
  }

  .upload-background {
    margin-bottom: 10px;
    z-index: 1999;
    input {
      display: none;
    }

    .upload-button {
      display: flex;
      align-items: center;
      background-color: #000;
      color: #fff;
      font-size: 15px;
      border: 2px solid #fff;
      padding: 10px;
      border-radius: 1rem;
      cursor: pointer;
    }

    .icon {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
  }

  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-main {
    position: absolute;
    background-color: white;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
  }

  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }

  @media only screen and (max-width: 550px) {
    .main-profile-info {
      margin-right: auto;
    }

    //both flex children
    //put pp on the left edge and metadata centered
    .extra-profile-info {
      margin: 0 auto;
    }
    .edit-profile-btn {
      position: absolute;
      top: -50px;
      right: 0;
    }
  }

  @media only screen and (max-width: 768px) {
    .edit-profile-btn {
      .btn-text {
        display: none;
      }
      .icon {
        font-size: 23px;
      }
    }
  }
`;

export default StyledProfileView;
