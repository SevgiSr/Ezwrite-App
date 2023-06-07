import styled from "styled-components";

const StyledProfileView = styled.header`
  height: 370px;
  width: 100%;
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
    z-index: -10;
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
  .profile-picture {
    position: relative;
    margin-bottom: 0.5rem;

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

  .profile-name {
    position: relative;
    font-size: 28px;
    margin-bottom: 5px;
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
    font-size: 19px;
    margin-bottom: 10px;
  }
  #user-info {
    margin-top: 1rem;
    padding: 0;
    list-style: none;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    li {
      text-align: center;
      margin: 0 1em;
      .info-btn {
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: transparent;
        border: none;
        font-size: 1rem;
        cursor: pointer;
        p {
          padding: 0;
          margin: 0;
        }
      }
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
`;

export default StyledProfileView;
