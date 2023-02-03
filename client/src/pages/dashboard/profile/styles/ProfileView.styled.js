import styled from "styled-components";

const StyledProfileView = styled.header`
  height: 500px;
  width: 100%;
  background-color: #5c5d56;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .edit-mode {
    width: 100vw;
    nav {
      display: flex;
      align-items: center;
      justify-content: end;
      height: 60px;
      position: fixed;
      top: 0;
      z-index: 2;
      background-color: white;
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
      height: 500px;
      background: #099;
    }
  }
  .profile-name {
    position: relative;
    input {
      padding: 6px 15px;
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      z-index: 2;
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
  #user-info {
    padding: 0;
    list-style: none;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    li {
      text-align: center;
      margin: 0 1em;
      p {
        padding: 0;
        margin: 0;
      }
    }
  }
`;

export default StyledProfileView;
